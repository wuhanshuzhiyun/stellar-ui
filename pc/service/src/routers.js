const qs = require("qs");
const express = require("express");
const router = express.Router();

const { getData, setData } = require("./datas.js");

router.get("/list", async (req, res, next) => {
  const { name } = req.query;
  try {
    const data = await getData(name);
    res.send({ code: 0, data });
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  const { name, content, user } = req.body;
  try {
    const data = await setData(name, { content, user });
    res.send({ code: 0, data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
