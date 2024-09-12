import * as Minio from "minio";

export async function uploadToMINIO(file: File) {
  try {
    const minioClient = new Minio.Client({
      endPoint: process.env.NEXT_PUBLIC_MINIO_ENDPOINT!,
      port: parseInt(process.env.NEXT_PUBLIC_MINIO_PORT!, 10),
      useSSL: true,
      accessKey: process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY!,
      secretKey: process.env.NEXT_PUBLIC_MINIO_SECRET_KEY!,
      region: process.env.NEXT_PUBLIC_MINIO_REGION!, // Set the region here if needed
    });

    const bucketName = process.env.NEXT_PUBLIC_MINIO_BUCKET_NAME!;
    const file_key =
      "uploads/" + Date.now().toString() + file.name.replace(" ", "-");

    const params = {
      bucketName: bucketName, // The name of the bucket
      objectName: file_key, // The name of the file as it will appear in MinIO
      filePath: file.webkitRelativePath, // The path of the file on your local system
    };

    // Upload the file using fPutObject
    const upload = minioClient.fPutObject(
      params.bucketName,
      params.objectName,
      params.filePath
    );

    await upload.then(() => {
      console.log("Successfully  uploaded to minIO!", file_key);
    });

    return Promise.resolve({
      file_key,
      file_name: file.name,
    });
  } catch (error) {}
}

export function getMinioUrl(file_key: string) {
  const bucketName = process.env.NEXT_PUBLIC_MINIO_BUCKET_NAME;
  const minioPort = process.env.NEXT_PUBLIC_MINIO_PORT; // Port for MinIO

  const url = `http://play.min.io:${minioPort}/browser/${bucketName}/${file_key}`;

  return url;
}
