const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const { authenticate, authorizeRole } = require("../middleware/auth_middleware");

// User routes
router.post("/register", controller.register);
router.post("/login", controller.login);
router.put("/promote/:id", authenticate, authorizeRole("admin"), controller.promote);

// Task routes
router.post("/tasks", authenticate, authorizeRole("admin"), controller.createTask);
router.get("/tasks", authenticate, controller.getAllTasks);
router.get("/tasks/:id", authenticate, controller.getTaskById);
router.put("/tasks/:id", authenticate, authorizeRole("admin"), controller.updateTask);
router.delete("/tasks/:id", authenticate, authorizeRole("admin"), controller.deleteTask);

module.exports = router;
