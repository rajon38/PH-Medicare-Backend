import express,{ Application, Request, Response } from 'express';
import { IndexRoute } from './app/routes';
const app: Application = express();

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Importing routes
app.use("/api/v1", IndexRoute);
// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Express!');
});

export default app;