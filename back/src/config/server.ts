import express, { Express } from 'express';
import cors from "cors";

import pastorRoutes from '../modules/pastor/pastor.routes';
import { errorHandler } from './errors';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/pastors', pastorRoutes);

app.use(errorHandler)

export default app;