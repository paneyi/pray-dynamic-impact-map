import app from './config/server';
import { initializeDatabase } from './config/storage';
import variables from './config/variables';

const PORT: number = variables.server.port;

initializeDatabase().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
});