const Router = require("express");
const router = new Router();
const controller = require("../controllers/userController");
const { check } = require("express-validator");
const checkAuth = require("../middleware/checkAuth");
router.post(
  "/registration",
  [
    check("email", "Неправильный Email").isEmail(),
    check("password", "Пароль должен быть длинее 6 символов").isLength({
      min: 6,
    }),
  ],
  controller.registration
);
router.post(
  "/auth",
  [
    check("email", "Неправильный Email").isEmail(),
    check("password", "Пароль должен быть длинее 6 символов").isLength({
      min: 6,
    }),
  ],
  controller.authorization
);
router.get("/getUser", checkAuth, controller.isUserAuth);

module.exports = router;
