import fs from 'fs';
import path from 'path';
import S3 from 'aws-sdk/clients/s3';
import upload, { PUBLIC_READ } from './s3';

/**
 * The S3 bucket.
 */
const BUCKET = 'mciuploads';

/**
 * Upload the provided argument to evergreen s3 bucket.
 *
 * @param {string} artifact - The artifact.
 * @param {string} awsKey - The aws key.
 * @param {string} awsSecret - The aws secret.
 *
 * @returns {Promise} The promise.
 */
async function uploadArtifactToEvergreen(artifact: string, awsKey: string, awsSecret: string, project: string, revision: string): Promise<void> {
  const s3 = new S3({
    accessKeyId: awsKey,
    secretAccessKey: awsSecret
  });
  const key = `${project}/${revision}/${path.basename(artifact)}`;
  const uploadParams = {
    ACL: PUBLIC_READ,
    Bucket: BUCKET,
    Key: key,
    Body: fs.createReadStream(artifact)
  };

  console.info(`mongosh: uploading ${artifact} to evergreen bucket:`, BUCKET, key);
  console.info(`mongosh: artifact download url: https://s3.amazonaws.com/${BUCKET}/${key}`);
  await upload(uploadParams, s3);
}

function getArtifactUrl(project: string, revision: string, artifact: string): string {
  return `https://s3.amazonaws.com/${BUCKET}/${project}/${revision}/${path.basename(artifact)}`;
}

export default uploadArtifactToEvergreen;
export { getArtifactUrl };
