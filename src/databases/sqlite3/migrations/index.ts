import { sqliteconection } from "..";
import { tableTasks } from "./tableTasks";
import { tableUsers } from "./tableUsers";

export async function runMigrations() {
  const schemas = [tableUsers, tableTasks].join("");

  sqliteconection()
    .then((db) => db.exec(schemas))
    .catch((error) => console.log(error));
}
