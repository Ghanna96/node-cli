import chalk from 'chalk';
import fs from 'fs';
import Listr from 'listr';
import getFileText from '../utils/getFileText';

export default class Route {
	readonly name: string;

	constructor(name: string) {
		this.name = name;
	}

	private async route() {
		const directory = process.cwd() + '/src/api/routes';
		const route = this.name + '.route.ts';
		const content = getFileText(this.name, 'route.txt');

		try {
			await fs.promises.access(directory);
			fs.writeFile(`${directory}/${route}`, content, (err) => {
				if (err) throw err;
			});
		} catch (error) {
			console.log(error);
		}
	}
	private controller() {
		const directory = process.cwd() + '/src/api/controllers';
		const controller = this.name + '.controller.ts';
		const content = getFileText(this.name, 'controller.txt');

		fs.writeFile(`${directory}/${controller}`, content, (err) => {
			if (err) throw err;
		});
	}

	async create() {
		const tasks = new Listr([
			{
				title: chalk.blue(this.name) + ' route created',
				task: () => this.route(),
			},
			{
				title: chalk.blue(this.name) + ' controller created',
				task: () => this.controller(),
			},
		]);
		await tasks.run();
	}
}
