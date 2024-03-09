import "dotenv/config";
import express from "express";
import appDataSource from "./db/app-data-source";
import router from "./router";

const app = express();
const port = process.env.PORT || 3000;

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
