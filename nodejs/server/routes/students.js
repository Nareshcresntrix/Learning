const express = require("express");
const router = express.Router();
const studentcontroller = require("../controllers/studentscontrollers");

router.get("/", studentcontroller.view);
// router.get("/adduser", studentcontroller.adduser);
router.post("/", studentcontroller.save);


module.exports = router;
       