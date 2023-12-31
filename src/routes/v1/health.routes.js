const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Status OK" });
});

module.exports = router;
