const router = require("express").Router();
const usersController = require("../controllers/usersController");

router.route("/register").post(usersController.register);
router.route("/login").post(usersController.login);
router.route("/logout").post(usersController.logout);

module.exports = router;
