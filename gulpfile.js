const {series, watch, task, src} = require('gulp');
const liveServer = require('gulp-live-server');
const run = require('gulp-run');
const copy = require('gulp-copy');
const del = require('del');

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


task('clear', function () {
  return del('dist/*');
});

task('copy-static', function () {
  return src('static/**').pipe(copy('dist', {prefix: 1}));
});

task('build-react-app', function () {
  const command = 'npm i && npm run ' + (process.env.environment === 'production' ? 'build-prod' : 'build-prod')
  const folder = './react-app';

  return runCommand(command, folder);
})

task('build-angular-app', function () {
  const command = 'npm i && npm run ' + (process.env.environment === 'production' ? 'build-prod' : 'build')
  const folder = './angular-app';

  return runCommand(command, folder);
})

task('deploy', function () {
  const command = 'firebase use default && firebase deploy --only hosting:tapit-app-' + process.env.environment
  const folder = './';

  return runCommand(command, folder);
})

task('build', series('clear', 'copy-static', 'build-react-app', 'build-angular-app'));

task('build-and-deploy', series('clear', 'copy-static', 'build-react-app', 'build-angular-app', 'deploy'));
