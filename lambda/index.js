const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
    const Bucket = event.Records[0].s3.bucket.name; // mj-s3-test
    const Key = decodeURIComponent(event.Records[0].s3.object.key); // mjs3test/12312312_abc.png
    console.log(Bucket, Key);
    const filename = Key.split('/')[Key.split('/').length - 1];
    const ext = Key.split('.')[Key.split('.').length - 1].toLowerCase(); //확장자
    const requiredFormat = ext === 'jpg' ? 'jpeg' : ext; //확장자가 jpg인 경우에 sharp에 jpeg로 넣어 줘야 함
    console.log('filename', filename, 'ext', ext);

    try {
        const s3Object = await s3.getObject({ Bucket, Key }).promise();
        console.log('mjs3test', s3Object.Body.length);
        const resizedImage = await sharp(s3Object.Body).resize(400, 400, { fit: 'inside' }).toFormat(requiredFormat).toBuffer();
        await s3
            .putObject({
                Bucket,
                Key: `thumb/${filename}`,
                Body: resizedImage,
            })
            .promise();
        console.log('put', resizedImage.length);
        return callback(null, `thumb/${filename}`);
    } catch (error) {
        console.error(error);
        return callback(error);
    }
};
