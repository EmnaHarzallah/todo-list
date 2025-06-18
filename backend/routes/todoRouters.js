// backend/routes/todoRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/todocontrollers");

router.get("/", controller.getTodos);
router.post("/", controller.createTodo);
router.put("/:id", controller.updateTodo);
router.delete("/:id", controller.deleteTodo);

module.exports = router;
