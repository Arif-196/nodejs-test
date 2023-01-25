const express = require("express");
const { body } = require("express-validator");
const {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const router = express.Router();

router.get("/get-task", getTasks);
router.post(
  "/add-task",
  [
    body("title").trim().isLength({ min: 5 }),
    body("description").trim().isLength({ min: 5 }),
  ],
  addTask
);
router.get("/:id", getTaskById);
router.patch(
  "/:id",
  [
    body("title").trim().isLength({ min: 5 }),
    body("description").trim().isLength({ min: 5 }),
  ],
  updateTask
);
router.delete("/:id", deleteTask);

module.exports = router;
