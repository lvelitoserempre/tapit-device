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
    assetsLinks: 'assetlinks.dev.json',
    appleAppSiteAssociation: 'apple-app-site-association.dev',
    buildCommand: 'npm run b',
    deployCommand: 'firebase deploy --only hosting:tapit-app-dev'
  },
  TAPIT_TESTING: {
    assetsLinks: 'assetlinks.dev.json',
    appleAppSiteAssociation: 'apple-app-site-association.dev',
    buildCommand: 'npm run b',
    deployCommand: 'firebase deploy --only hosting:tapit-app-testing'
  },
  TAPIT_QA: {
    assetsLinks: 'assetlinks.dev.json',
    appleAppSiteAssociation: 'apple-app-site-association.dev',
    buildCommand: 'npm run b-qa',
    deployCommand: 'firebase deploy --only hosting:tapit-app-qa'
  },
  TAPIT_PREVIEW: {
    assetsLinks: 'assetlinks.prod.json',
    appleAppSiteAssociation: 'apple-app-site-association.prod',
    buildCommand: 'npm run b-prod',
    deployCommand: 'firebase deploy --only hosting:tapit-app-preview'
  },
  TAPIT_PRODUCTION: {
    assetsLinks: 'assetlinks.prod.json',
    appleAppSiteAssociation: 'apple-app-site-association.prod',
    buildCommand: 'npm run b-prod',
    deployCommand: 'firebase deploy --only hosting:tapit-app-production'
  },
  BRAHMA_SSO_PRODUCTION: {
    assetsLinks: 'assetlinks.prod.json',
    appleAppSiteAssociation: 'apple-app-site-association.prod',
    buildCommand: 'npm run b-prod',
    deployCommand: 'firebase deploy --only hosting:clube-brahma-sso && firebase deploy --only hosting:clube-brahma-sso-example'
  },
}

function runCommand(command, folder) {
  return run(command, {cwd: folder})
    .exec(undefined, (error) => {
      console.log(error);
    })
}

/* Task to clear the dist folder */
task('clear', function () {
  return del('dist/*');
});
task('clear2', function () {
  return del('home/dist/*');
});
/* Task to build tailwindcss and add to apps */
task('build-tailwind', function () {
  return src('tailwindcss/tailwind.css')
    .pipe(postcss([postcssImport, tailwindcss, autoprefixer, cssnano]))
    .pipe(dest('static/assets/styles'))
    //.pipe(dest('react-app/src/assets/styles'))
    .pipe(dest('angular-app/src/assets/styles'))
    //.pipe(dest('sso-app/src/assets/styles'))
    .pipe(dest('home/src/assets/styles'))
})
/* Task to copy static pages to dist folder */
task('copy-static', function () {
  return src('static/**').pipe(copy('dist', {prefix: 1}));
});
/* Task to copy assetlinks to dist folder */
task('copy-assetlinks', function () {
  const file =  BUILD_MAP[process.env.ENV].assetsLinks;
  return src('.well-known/' + file)
    .pipe(rename("assetlinks.json"))
    .pipe(dest("./dist/.well-known"));
});
/* Task to copy apple deeplins */
task('copy-applefile', function () {
  const file =  BUILD_MAP[process.env.ENV].appleAppSiteAssociation;
  return src('.well-known/' + file)
    .pipe(rename("apple-app-site-association"))
    .pipe(dest("./dist/.well-known"));
});
/* Task to build angular app (profile) */
task('build-angular-app', function () {
  const command = 'npm i && ' + BUILD_MAP[process.env.ENV].buildCommand
  const folder = './angular-app';

  return runCommand(command, folder);
});
task('copy-to-home', function () {
  return src('dist/**').pipe(copy('home/dist/home/dist/home/browser', {prefix: 1}));
});

/* serve scripts */
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

task('copy-fonts', function () {
  return src('static/assets/fonts/**').pipe(copy('dist', {prefix: 1}));
});

/* DEPRECATED */
task('build-react-app', function () {
  const command = 'npm i && npm run b-prod';
  const folder = './react-app';

  return runCommand(command, folder);
})
/* DEPRECATED */
task('build-sso-app', function () {
  const command = 'npm i && ' + BUILD_MAP[process.env.ENV].buildCommand
  const folder = './sso-app';

  return runCommand(command, folder);
})

task('build-home-app', function () {
  const command = 'npm run d';
  const folder = './home';

  return runCommand(command, folder);
})

task('deploy', function () {
  const command = BUILD_MAP[process.env.ENV].deployCommand;
  const folder = './';

  return runCommand(command, folder);
})

task('build', series('clear', 'clear2', 'build-tailwind', 'copy-static', 'copy-assetlinks', 'copy-applefile',
  'build-angular-app', 'copy-to-home'));

task('deploy-tapit', series('clear', 'build-tailwind', 'copy-static', 'copy-assetlinks', 'copy-applefile',
  'build-angular-app', 'build-home-app', 'deploy'));

task('deploy-brahma-sso', series('clear', 'copy-fonts', 'build-sso-app', 'deploy'));
