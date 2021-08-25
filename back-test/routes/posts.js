const express = require("express");
const { Image,  Post } = require("../models");
const router = express.Router();

router.get("/",  async (req, res, next) => {
  //get /posts

  try {
      const posts = await Image.findAll({
        where: {},
        order: [["createdAt", "DESC"]],
      });
      res.status(201).json(posts);

  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
