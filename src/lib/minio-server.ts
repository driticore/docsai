import AWS from "aws-sdk"
import fs from "fs"
export async function downloadFromMinio(file_key: string, file: File) {
    try {
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY!,
            secretAccessKey: process.env.NEXT_PUBLIC_MINIO_SECRET_KEY
        });
        const minio = new AWS.S3({
            params: {
                Bucket: process.env.NEXT_PUBLIC_MINIO_BUCKET_NAME!
            },
            region: process.env.NEXT_PUBLIC_MINIO_REGION!
        });
        const params = {
            Bucket: process.env.NEXT_PUBLIC_MINIO_BUCKET_NAME!,
            Key: file_key,
        };

        const file_name = `/tmp/doc-${Date.now()}.${file.type}`
        const obj = await minio.getObject(params).promise()
        fs.writeFileSync(file_name, obj.Body as Buffer)
    } catch (error) {
        console.error(error)
        return null
    }
}