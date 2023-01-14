import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import _ from "lodash";

const BUCKET_NAME = process.env.REACT_APP_BANNER_BUCKET_NAME;
const REGION = process.env.REACT_APP_BANNER_REGION;
const IDENTITY_ID = process.env.REACT_APP_BANNER_IDENTITY_POOL_ID;

AWS.config.update({
    region: REGION,
    credentials: new AWS.CognitoIdentityCredentials({ IdentityPoolId: IDENTITY_ID})
});

const s3 = new S3({
    apiVersion: "2006-03-01",
    params: { Bucket: BUCKET_NAME }
});

class ImagesService {
    getImages() {
        const promise = new Promise((resolve, reject) => {
            s3.listObjects({Delimiter: '/'}, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const images = _.map(data.Contents, (content) => {
                        const url = s3.getSignedUrl('getObject', {Bucket: BUCKET_NAME, Key: content.Key, Expires: 60*10});
                        return {src: url, caption: content.Key, key: content.Key};
                    });
                    resolve(images);
                }
            })
        })
        return promise;
    }

    deleteImage(image) {
        const promise = new Promise((resolve, reject) => {
            s3.deleteObject({Bucket: BUCKET_NAME, Key: image.caption}, (err, data) => {
               if (err) reject(err);
               else {
                   resolve(data);
               }
            });
        })
        return promise;
    }

    uploadImage(file) {
        return new AWS.S3.ManagedUpload({params: {Bucket: BUCKET_NAME, Key: file.name, Body: file}})
            .promise()
            .then(data => {
                const url = s3.getSignedUrl('getObject', {Bucket: BUCKET_NAME, Key: data.Key, Expires: 60*10});
                return {src: url, caption: data.Key, key: data.Key};
                });
    }
}

const service = new ImagesService();
export default service;
