const express = require('express');
const path = require('path');
const router = express.Router();

router.use('/', express.static(path.join(process.cwd(), '/webs/plus')));

router.use("*",(req,res)=>{
  res.sendFile(path.join(process.cwd(), '/webs/plus/index.html'));
})

module.exports = router;
