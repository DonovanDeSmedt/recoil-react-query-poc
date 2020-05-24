const chalk = require('chalk');
const paths = require('../../config/paths');

// Crash on unhandled rejections
process.on('unhandledRejection', err => {
  throw err;
});

// Add dependencies
const packages = [
  'redux',
  'react-redux',
  'redux-actions',
  'redux-saga',
  'redux-thunk',
];
const devDependencies = ['redux-logger'];
const templateFiles = [
  'configure-store.js',
  'reducers.js',
  'sagas.js',
  'index.js',
];

console.log(chalk.cyan('Adding redux packages\n'));

const execSync = require('child_process').execSync;
execSync(`yarn add ${packages.join(' ')}`, { stdio: [0, 1, 2] });

console.log(chalk.cyan('\nDone adding redux packages\n'));
console.log(chalk.cyan('Adding redux dev packages\n'));

execSync(`yarn add ${devDependencies.join(' ')} -D`, {
  stdio: [0, 1, 2],
});
console.log(chalk.cyan('\nDone adding redux dev packages\n'));

console.log(chalk.cyan('Copying template files\n'));
var fs = require('fs');

// destination.txt will be created or overwritten by default.
templateFiles.forEach(file => {
  if (fs.existsSync(`./scripts/redux/${file}`)) {
    console.log(chalk.cyan(`copying ${file} ...`));
    fs.copyFileSync(`./scripts/redux/${file}`, `${paths.appSrc}/${file}`);
  } else {
    console.log(chalk.red('Something went wrong: the file doesnt exist'));
  }
});

console.log(chalk.cyan('Done. You can use redux now.\n'));

['SIGINT', 'SIGTERM'].forEach(function(sig) {
  process.on(sig, function() {
    process.exit();
  });
});
