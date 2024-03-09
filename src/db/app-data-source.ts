import { DataSource } from "typeorm";
import "dotenv/config";

const appDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  logging: false,
  synchronize: false,
});

export default appDataSource;
