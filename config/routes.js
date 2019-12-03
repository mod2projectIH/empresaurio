const express = require("express");
const router = express.Router();
const workerController = require("../controllers/workers.controller");

const authMiddleware = require("../middlewares/auth.middleware");

module.exports = router;

router.get("/", authMiddleware.isAuthenticated, workerController.index);
router.get("/login", authMiddleware.isNotAuthenticated, workerController.login);
router.post("/login", authMiddleware.isNotAuthenticated, workerController.doLogin);
