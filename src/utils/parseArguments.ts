interface Arg {
	'--version'?: boolean;
	'--route'?: string;
	'--create'?: string;
}

export const parseArguments = (args: Arg) => {
	return {
		version: args['--version'],
		route: args['--route'],
		create: args['--create'],
	};
};
