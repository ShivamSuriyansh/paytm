const express = require('express');
const userRouter = require("./user");
const accountRouter = require("../routes/account");

const router = express.Router();

router.use("/user", userRouter)
router.user("/Account",accountRouter);

module.exports = router;