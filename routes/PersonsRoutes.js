const router = require("express").Router();

const PersonsController = require("../controller/PersonsController");

router.get("/", PersonsController.read);

router.post("/", PersonsController.create);

router.put("/:id", PersonsController.update);

router.get("/:id", PersonsController.readById);

router.delete("/:id", PersonsController.del);

module.exports = router;
