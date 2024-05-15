import express from "express";
import "dotenv/config";
import { pageNotFound } from "./errors/pageNotFound";
import { appErrors } from "./errors/appErros";
import { routes } from "./routes";
import { sqliteConnection } from "./databases/sqlite3";
import { runMigrations } from "./databases/sqlite3/migrations";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.use(pageNotFound);
app.use(appErrors);

app.listen(PORT, () => {
  console.log(`Server is running in Ice Cold ${PORT}`);
});

sqliteConnection()
  .then(() => console.log("Database connectado..."))
  .catch((error) => console.error("Database não conectado", error));

runMigrations();
