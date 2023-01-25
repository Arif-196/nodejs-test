const db = require("../models");
const Task = db.models.Task;
const { validationResult } = require("express-validator");
const makeResponse = require("../helper/response");

const getTasks = async (req, res, next) => {
  try {
    const task = await Task.findAll();
    return makeResponse.success(
      res,
      { task: task },
      200,
      "Fetched Task Successfully"
    );
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const getTaskById = async (req, res, next) => {
  const taskId = req.params.id;
  const task = await Task.findOne({
    where: {
      id: taskId,
    },
  });
  try {
    if (!task) {
      const error = new Error("Could not find task");
      error.statusCode = 404;
      throw error;
    }
    return makeResponse.success(
      res,
      { task: task },
      200,
      "Fetched Task Successfully"
    );
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const addTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    next(error);
  }
  const { title, description, submitted } = req.body;
  try {
    const task = await Task.create({
      title: title,
      description: description,
      submitted: submitted,
    });
    return makeResponse.success(
      res,
      { task: task },
      200,
      "Created Task Successfully"
    );
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    next(error);
  }
  const { title, description, submitted } = req.body;
  try {
    await Task.update(
      {
        title: title,
        description: description,
        submitted: submitted,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const task = await Task.findAll({
      where: {
        id: req.params.id,
      },
    });
    return makeResponse.success(
      res,
      { task: task },
      201,
      "Updated Task Successfully"
    );
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id },
    });
    await Task.destroy({
      where: {
        id: req.params.id,
      },
    });
    return makeResponse.success(
      res,
      { task: task },
      200,
      "Deleted Task Successfully"
    );
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
};
