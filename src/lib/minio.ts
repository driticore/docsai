import AWS from 'aws-sdk';

export async function uploadToMinIO(file: File) {
  try {
    // Configure AWS SDK for MinIO
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY!,
      secretAccessKey: process.env.NEXT_PUBLIC_MINIO_SECRET_KEY!,
    });

    const sslEnabled = process.env.NEXT_PUBLIC_MINIO_SSL === 'true';
    const endpoint = `${sslEnabled ? 'https' : 'http'}://${process.env.NEXT_PUBLIC_MINIO_ENDPOINT}:${process.env.NEXT_PUBLIC_MINIO_PORT}`;

    const s3 = new AWS.S3({
      endpoint,
      s3ForcePathStyle: true, // Needed for MinIO
      signatureVersion: 'v4', // Ensure correct signature version
      region: process.env.NEXT_PUBLIC_MINIO_REGION || 'us-east-1', // Default region
    });

    const file_key = "uploads/" + Date.now().toString() + file.name.replace(/\s+/g, "-");
    const params = {
      Bucket: process.env.NEXT_PUBLIC_MINIO_BUCKET_NAME!,
      Key: file_key,
      Body: file,
    };

    // Upload file to MinIO
    const upload = s3
      .putObject(params)
      .on('httpUploadProgress', (evt) => {
        console.log('Uploading to MinIO...', Math.round((evt.loaded * 100) / evt.total));
      })
      .promise();

    await upload;
    console.log('Successfully uploaded to MinIO!', file_key);

    return {
      file_key,
      file_name: file.name,
    };
  } catch (error) {
    console.error('Error uploading file to MinIO:', error);
    throw new Error('Upload failed');
  }
}

export function getMinioUrl(file_key: string) {
  const bucketName = process.env.NEXT_PUBLIC_MINIO_BUCKET_NAME;
  const minioPort = process.env.NEXT_PUBLIC_MINIO_PORT || '9000'; // Default MinIO port
  const minioEndpoint = process.env.NEXT_PUBLIC_MINIO_ENDPOINT?.replace(/^http?:\/\//, '') || 'localhost';
  const sslEnabled = process.env.NEXT_PUBLIC_MINIO_SSL === 'true';
  
  // Construct MinIO URL
  const protocol = sslEnabled ? 'https' : 'http';
  const url = `${protocol}://${minioEndpoint}:${minioPort}/${bucketName}/${file_key}`;

  return url;
}
