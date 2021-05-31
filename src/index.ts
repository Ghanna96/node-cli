#!/usr/bin/env node

import chalk from 'chalk';
import arg from 'arg';
import Route from './commands/route';
import { parseArguments } from './utils/parseArguments';
import Project from './commands/create';
const { version, author } = require('./package.json');
const clear = require('clear');
const figlet = require('figlet');

clear();

const args = arg({
	'--help': Boolean,
	'--version': Boolean,
	'--route': String,
	'--create': String,

	'-v': '--version',
	'-r': '--route',
	'-c': '--create',
});
const instructions =
	'Options:\n\n  -v, --version			output the version number\n  -r, --route <name>		create new route and controller\n  -c, --create <name>   	bootstrap a new Kayo project';

console.log(
	chalk.yellowBright(figlet.textSync('ARLS-CLI', { horizontalLayout: 'full' }))
);

console.log('Author: ', chalk.italic('Akram Ghanname'), '\n');
console.log(instructions, '\n\n');

(async () => {
	let options = parseArguments(args);

	if (options.version) {
		console.log(version);
	}
	if (options.route) {
		const route = new Route(options.route);
		try {
			await route.create();
		} catch (err) {
			console.log(err);
			console.log(instructions, '\n\n');
		}
	}
	if (options.create) {
		const kayo = new Project(options.create);

		try {
			await kayo.bootstrap();
		} catch (err) {
			console.log(err);
		}
	}
})();
