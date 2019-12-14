const express = require("express");
const router = express.Router();
const workerController = require("../controllers/workers.controller");
const hrController = require("../controllers/hr.controller");

const multer = require ("multer")
const upload = multer({ dest: './public/uploads/' });


const authMiddleware = require("../middlewares/auth.middleware");
const checkMiddleware = require("../middlewares/check.middleware");

module.exports = router;

router.get("/", authMiddleware.isAuthenticated, workerController.index);
router.get('/workers/new',authMiddleware.isHR, workerController.new)
router.post('/workers/new',upload.single('profilePic'), workerController.create)


router.get("/login", authMiddleware.isNotAuthenticated, workerController.login);
router.post("/login", authMiddleware.isNotAuthenticated, workerController.doLogin);

router.get("/workers/checkin", authMiddleware.isAuthenticated, workerController.checkin);
router.post("/workers/checkin", authMiddleware.isAuthenticated, workerController.doCheckin);
// router.get("/workers/checkout", authMiddleware.isAuthenticated, checkMiddleware.isWorked, workerController.checkout);
// router.post("/workers/checkout", authMiddleware.isAuthenticated, checkMiddleware.isWorked, workerController.doCheckout);

router.get("/logout", authMiddleware.isAuthenticated, workerController.logout);


router.get('/workers/:id', authMiddleware.isAuthenticated, authMiddleware.isHR, hrController.details)


router.get('/workers/:id/deploy', authMiddleware.isAuthenticated, authMiddleware.isHR, hrController.checkWorker)
