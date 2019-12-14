const express = require("express");
const router = express.Router();
const workerController = require("../controllers/workers.controller");
const hrController = require("../controllers/hr.controller");

const multer = require ("multer")
const upload = multer({ dest: './public/uploads/' });


const authMiddleware = require("../middlewares/auth.middleware");

module.exports = router;

router.get("/", authMiddleware.isAuthenticated, workerController.index);
router.get('/workers/new', workerController.new)
router.post('/workers/new',upload.single('profilePic'), workerController.create)

//Check worker details => we have to use a middleware in order to let them access to this route. 

//Human resources controller
router.get('/hr',authMiddleware.isHR, workerController.hrIndex)
router.get("/logout", authMiddleware.isNotHR, workerController.logout);

router.get('/workers/:id', authMiddleware.isHR, hrController.details)


router.get("/login", authMiddleware.isNotAuthenticated, authMiddleware.isNotHR, workerController.login);
router.post("/login", authMiddleware.isNotAuthenticated, authMiddleware.isNotHR, workerController.doLogin);


router.get("/logout", authMiddleware.isAuthenticated, workerController.logout);
