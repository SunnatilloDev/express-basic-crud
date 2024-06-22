const { Router } = require("express");
const userController = require("../controllers/user.controller");
const multer = require("multer");
let multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });
let router = Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.updateUser);
router.post("/", upload.single("image"), userController.postUsers);
router.get("/uploads/:link", userController.getUserImage);

module.exports = router;
