import execa from 'execa';
import process from 'process';
import Listr from 'listr';
import chalk from 'chalk';

export default class Project {
	readonly name: string;

	constructor(name: string) {
		this.name = name;
	}

	private async cloneRepo() {
		try {
			await execa('git', [
				'clone',
				'REPLACE HERE', //template to clone
				this.name,
			]);
		} catch (err) {
			console.log(err);
		}
	}

	private async installPkg() {
		// const spinner = ora('Installing npm packages...').start();
		const directory = `${process.cwd()}/${this.name}`;
		try {
			process.chdir(directory);
			await execa('npm', ['install']);
			// spinner.stop();
		} catch (err) {
			console.log(err);
		}
	}

	async bootstrap() {
		const tasks = new Listr([
			{
				title: 'Clone repo from GitLab',
				task: () => this.cloneRepo(),
			},
			{
				title: 'Install package dependencies with npm',
				task: () => this.installPkg(),
			},
		]);

		await tasks.run();
		// console.log('\n%s Project ready', chalk.green.bold('DONE'));
		console.log(
			`\n%s ${chalk.blue(this.name)} created!\n\n`,
			chalk.green.bold('DONE!')
		);

		console.log(
			`To create new routes: \n${chalk.yellow('cd', this.name)}\n${chalk.yellow(
				'arls-cli -r <name>'
			)} \n`
		);
	}
}
