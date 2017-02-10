const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

function directoryExists(filePath) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (err) {
    return false;
  }
}

/**
 * Get current path
 */
function getCurrentDirectory() {
  return process.cwd;
}

/**
 * Get current path
 */
function getBaseDirectory() {
  return path.basename(process.cwd());
}

/**
 * Load template file
 */
function loadTemplate(name) {
  return fs.readFileSync(path.join(__dirname, '/', 'templates', name), 'utf-8');
}

clear();
console.log(
  chalk.yellow(
    figlet.textSync('Express Gen', { horizontalLayout: 'full', font: 'Small' })
  )
);

const appName = getBaseDirectory();

const pkg = {
  name: appName,
  version: '0.0.0',
  private: true,
  scripts: { start: 'node server' },
  dependencies: {
    express: '~4.14.1'
  }
};

const server = loadTemplate('server.js');
const routes = loadTemplate('routes.js');

function main() {
  fs.outputFile('./server.js', server, (err) => {
    if (err) throw err;
    return console.log('Created server.js');
  });
  fs.writeJson('./package.json', pkg, (err) => {
    if (err) throw err;
    return console.log('Created package.json');
  });
  fs.mkdirs('./app', '0755', (err) => {
    if (err) throw err;
    console.log('Directory created successfully!');
    fs.outputFile('./app/routes.js', routes, (error) => {
      if (error) throw error;
      console.log('Created routes.js');
    });
  });
}

main();
