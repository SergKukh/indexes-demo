import { Router } from "express";
import appDataSource from "./db/app-data-source";

const router = Router();

router.get("/search", async (req, res) => {
  const { firstname, lastname } = req.query;

  const users = await appDataSource.query(
    `
    SELECT *
    FROM users
    WHERE firstname LIKE ? AND lastname LIKE ?
    ORDER BY id
  `,
    [`${firstname}%`, `${lastname}%`]
  );

  res.send(users);
});

export default router;
