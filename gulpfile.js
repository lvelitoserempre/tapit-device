const {series, watch, task, src, dest} = require('gulp');
const liveServer = require('gulp-live-server');
const run = require('gulp-run');
const copy = require('gulp-copy');
const del = require('del');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');

function runCommand(command, folder) {
  return run(command, {cwd: folder})
    .exec(undefined, (error) => {
      console.log(error);
    })
}

task('serve-dist', function () {
  const server = liveServer.static('dist', 3000);
  server.start();

  watch(['dist/**'], function (file) {
    server.notify.apply(server, [file]);
  });
});

task('serve-static', function () {
  const server = liveServer.static('static', 3000);
  server.start();

  watch(['static/**'], function (file) {
    server.notify.apply(server, [file]);
  });
});

task('serve-sso-example', function () {
  const server = liveServer.static('sso-example', 3000);
  server.start();

  watch(['sso-example/**'], function (file) {
    server.notify.apply(server, [file]);
  });
});

task('clear', function () {
  return del('dist/*');
});

task('copy-static', function () {
  return src('static/**').pipe(copy('dist', {prefix: 1}));
});

task('copy-assetlinks', function () {
  const file = isProductionBuild() ? 'assetlinks.prod.json' : 'assetlinks.dev.json';
  return src('.well-known/' + file)
    .pipe(rename("assetlinks.json"))
    .pipe(dest("./dist/.well-known"));
});

task('copy-applefile', function () {
  const file = 'apple-app-site-association';
  return src('.well-known/' + file)
    .pipe(dest("./dist/.well-known"));
});

task('build-tailwind', function () {
  return src('tailwindcss/tailwind.css')
    .pipe(postcss([postcssImport, tailwindcss, autoprefixer, cssnano]))
    .pipe(dest('static/assets/styles'))
    .pipe(dest('react-app/src/assets/styles'))
    .pipe(dest('angular-app/src/assets/styles'))
})

task('build-react-app', function () {
  const command = 'npm i && npm run ' + (isProductionBuild() ? 'build-prod' : 'build-prod')
  const folder = './react-app';

  return runCommand(command, folder);
})

task('build-angular-app', function () {
  const command = 'npm i && npm run ' + (isProductionBuild() ? 'build-prod' : 'build')
  const folder = './angular-app';

  return runCommand(command, folder);
})

task('deploy', function () {
  const command = 'firebase use default && firebase deploy --only hosting:tapit-app-' + process.env.environment
  const folder = './';

  return runCommand(command, folder);
})

task('build', series('clear', 'build-tailwind', 'copy-static', 'copy-assetlinks', 'copy-applefile', 'build-react-app', 'build-angular-app'));

task('build-and-deploy', series('clear', 'build-tailwind', 'copy-static', 'copy-assetlinks', 'copy-applefile', 'build-react-app', 'build-angular-app', 'deploy'));


function isProductionBuild() {
 return process.env.environment === 'production' || process.env.environment === 'preview';
}
