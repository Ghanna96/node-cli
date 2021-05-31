import path from 'path';
import fs from 'fs';

const getFileText = (
	arg: string,
	fileName: 'route.txt' | 'controller.txt'
): string => {
	const name = arg.toLowerCase();
	const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

	if (!name) throw Error('Invalid name');

	let file = path.join(__dirname, `../templates/${fileName}`);

	let content = fs.readFileSync(file).toString();
	if (fileName === 'controller.txt') {
		content = content.replace(/\${Name}/g, nameCapitalized);
		return content;
	}
	content = content.replace(/\${name}/g, name);
	content = content.replace(/\${Name}/g, nameCapitalized);

	return content;
};

export default getFileText;
