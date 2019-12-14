module.exports.isAuthenticated = (req, res, next) => {
  if (req.session.worker) {
    next()
  } else {
    req.session.genericError = 'User is not authenticated!'
    res.redirect('/login');
  }
}
module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.session.worker) {
    res.redirect('/');
  } else {
    next()
  }
}
module.exports.isHR = (req, res, next) => {
  const worker = req.session.worker
  if (req.session.worker && worker.isHR) {
    next()
  } else {
    req.session.genericError = 'User is not HR!'
    res.redirect('/');
  }
}

const express = require("express");
const router = express.Router();
const workerController = require("../controllers/workers.controller");
const hrController = require("../controllers/hr.controller");
const multer = require ("multer")
const upload = multer({ dest: './public/uploads/' });
const authMiddleware = require("../middlewares/auth.middleware");
module.exports = router;
router.get("/", authMiddleware.isAuthenticated, workerController.index);
router.get("/workers/check", authMiddleware.isAuthenticated, workerController.check);
router.post("/workers/check", authMiddleware.isAuthenticated, workerController.doCheck)

router.get('/workers/:id', authMiddleware.isAuthenticated,authMiddleware.isHR, hrController.details)
router.get("/login", authMiddleware.isNotAuthenticated, workerController.login);
router.post("/login", authMiddleware.isNotAuthenticated, workerController.doLogin);

router.get('/workers/new',authMiddleware.isHR, workerController.new)
router.post('/workers/new',authMiddleware.isHR, upload.single('profilePic'), workerController.create)

router.get("/logout", authMiddleware.isAuthenticated, workerController.logout);