import mysql from "mysql2";
import { dbVariables } from "./envVariables";

const pool = mysql.createPool({
  host: dbVariables.host,
  user: dbVariables.user,
  password: dbVariables.password,
  database: dbVariables.database,
});

const promisePool = pool.promise();

export default promisePool;
