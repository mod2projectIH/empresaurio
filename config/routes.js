const express = require("express");
const router = express.Router();
const workerController = require("../controllers/workers.controller");
const multer = require ("multer")
const upload = multer({ dest: './public/uploads/' });


const authMiddleware = require("../middlewares/auth.middleware");

module.exports = router;

router.get("/", authMiddleware.isAuthenticated, workerController.index);

router.get('/workers/new', workerController.new)
router.post('/workers/new',upload.single('profilePic'), workerController.create)
// router.get('/workers/:token/validate', workerController.validate)

router.get("/login", authMiddleware.isNotAuthenticated, workerController.login);
router.post("/login", authMiddleware.isNotAuthenticated, workerController.doLogin);
