const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const multer = require('multer');
const AWS = require('aws-sdk');

const { Image, Post } = require('../models');

const router = express.Router();

try {
    fs.accessSync('uploads');
} catch (err) {
    // console.log('uploads폴더가 없으므로 생성하기');
    fs.mkdirSync('uploads');
}

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});

const upload = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'mj-s3-test',
        key(req, file, cb) {
            cb(null, `mjs3test/${Date.now()}_${path.basename(file.originalname)}`);
        },
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/images', upload.array('image'), async (req, res, next) => {
    //POST /post/images
    console.log(req.files);
    res.json(req.files.map((v) => v.location));
});

router.post('/', upload.none(), async (req, res, next) => {
    //POST /post
    try {
        const post = await Post.create({});
        if (req.body.image) {
            if (Array.isArray(req.body.image)) {
                const images = await Promise.all(req.body.image.map((img) => Image.create({ src: img })));
                await post.addImages(images);
            } else {
                const image = await Image.create({ src: req.body.image });
                await post.addImages(image);
            }
        }
        const fullPost = await Image.findAll({
            where: {},
            order: [['createdAt', 'DESC']],
            include: [{ model: Post, where: { id: post.id } }],
        });
        res.status(201).json(fullPost);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
