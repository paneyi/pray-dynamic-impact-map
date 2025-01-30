interface ServerConfig {
	host: string;
	port: number;
}

interface Variables {
	env: string;
	server: ServerConfig;
}

const HOST = process.env.HOST ?? '0.0.0.0';
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const DEVELOPMENT_ENV = 'development';
const env = process.env.NODE_ENV || DEVELOPMENT_ENV;

const VARIABLES: Variables = Object.freeze({
	env,
	server: {
		host: HOST,
		port: PORT
	}
});

export default VARIABLES;