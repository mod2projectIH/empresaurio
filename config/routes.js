const express = require("express");
const router = express.Router();
const workerController = require("../controllers/workers.controller");
const workdaysController = require ("../controllers/workdays.controller")
const hrController = require("../controllers/hr.controller");
const fileController = require("../controllers/file.controller");
const multer = require ("multer")
const upload = multer({ dest: './public/uploads/' });
const authMiddleware = require("../middlewares/auth.middleware");
module.exports = router;

router.get("/", authMiddleware.isAuthenticated, workerController.index);
router.get('/workers/new',authMiddleware.isHR, workerController.new)
router.post('/workers/new',authMiddleware.isHR, upload.single('profilePic'), workerController.create)


router.get("/login", authMiddleware.isNotAuthenticated, workerController.login);
router.post("/login", authMiddleware.isNotAuthenticated, workerController.doLogin);

router.get("/workers/check", authMiddleware.isAuthenticated, workerController.check);
router.post("/workers/check", authMiddleware.isAuthenticated, workerController.doCheck)
router.get("/workdays", authMiddleware.isAuthenticated, workdaysController.index)
router.get("/workers", authMiddleware.isHR, hrController.workersIndex)

router.get("/logout", authMiddleware.isAuthenticated, workerController.logout);
router.get('/workers/:id', authMiddleware.isAuthenticated, authMiddleware.isHR, hrController.details)

router.get('/workers/:id/upload', authMiddleware.isAuthenticated,  fileController.uploadFile)
router.post('/workers/:id/upload', authMiddleware.isAuthenticated,  upload.single('file'), fileController.doUploadFile)
router.post('/workers/:id/uploadDetails', authMiddleware.isAuthenticated,  upload.single('file'), fileController.doUploadFileDetails)

router.get('/workers/:id/edit', authMiddleware.isAuthenticated, authMiddleware.isHR, hrController.edit)
router.post('/workers/:id/edit', authMiddleware.isAuthenticated, authMiddleware.isHR, hrController.doEdit)

router.post('/workers/delete/:id', authMiddleware.isAuthenticated, authMiddleware.isHR, hrController.deleteWorker)
router.get('/workers/:id/uploadFiles', authMiddleware.isAuthenticated, authMiddleware.isHR, hrController.deployDetails)


//Files

