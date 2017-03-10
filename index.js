#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

/**
 * Get directory name
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

/**
 * Output logger
 */
function logOutput(err, fileName) {
  if(err) return console.log(err);
  console.log(`Created ${fileName} successfully`);
}

function packageCb(err) {
  logOutput(err, 'package.json');
}

function serverCb(err) {
  logOutput(err, 'server.js');
}

function routesCb(err) {
  logOutput(err, 'routes.js');
}

function mkdirCb(err) {
  logOutput(err, 'app directory');
  fs.outputFile('./app/routes.js', routes, routesCb);
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
  version: '0.0.1',
  private: true,
  scripts: { start: 'node server' },
  dependencies: {
    express: '~4.14.1'
  }
};

const server = loadTemplate('server.js');
const routes = loadTemplate('routes.js');

function main() {
  fs.mkdirs('./app', '0755', mkdirCb);
  fs.outputFile('./server.js', server, serverCb);
  fs.writeJson('./package.json', pkg, packageCb);
}

main();