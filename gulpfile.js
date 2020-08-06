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

BUILD_MAP = {
  TAPIT_DEV: {
    build: 'develop',
    deploy: 'firebase deploy --only hosting:tapit-app-dev'
  },
  TAPIT_TESTING: {
    build: 'develop',
    deploy: 'firebase deploy --only hosting:tapit-app-testing'
  },
  TAPIT_PREVIEW: {
    build: 'production',
    deploy: 'firebase deploy --only hosting:tapit-app-preview'
  },
  TAPIT_PRODUCTION: {
    build: 'production',
    deploy: 'firebase deploy --only hosting:tapit-app-production'
  },
  BRAHMA_SSO_DEV: {
    build: 'develop',
    deploy: 'firebase deploy --only hosting:clube-brahma-sso && firebase deploy --only hosting:clube-brahma-sso-example'
  },
}


function isProductionBuild() {
  return BUILD_MAP[process.env.ENV].build === 'production';
}

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

task('serve-sso', function () {
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
    .pipe(dest('sso-app/src/assets/styles'))
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

task('build-sso-app', function () {
  const command = 'npm i && npm run ' + (isProductionBuild() ? 'build-prod' : 'build')
  const folder = './sso-app';

  return runCommand(command, folder);
})

task('deploy', function () {
  const command = BUILD_MAP[process.env.ENV].deploy;
  const folder = './';

  return runCommand(command, folder);
})

task('build', series('clear', 'build-tailwind', 'copy-static', 'copy-assetlinks', 'copy-applefile', 'build-react-app', 'build-angular-app','build-sso-app'));

task('deploy-tapit', series('clear', 'build-tailwind', 'copy-static', 'copy-assetlinks', 'copy-applefile', 'build-react-app', 'build-sso-app', 'deploy'));

task('deploy-brahma-sso', series('clear', 'build-sso-app', 'deploy'));
