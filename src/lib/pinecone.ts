import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromMinio } from "./minio-server";
import { PDFLoader, DocxLoader, PPTXLoader, XLSXLoader, TextLoader } from "langchain/document_loader/fs";
import { OpenAIEmbeddings } from "langchain";
import { VectorStore } from "langchain";

// Initialize Pinecone client
let pinecone: Pinecone | null = null;

export const getPinecone = async () => {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!, // Ensure the key is loaded correctly
    });
  }
  return pinecone;
};

export async function loadMinioIntoPinecone(filekey: string, file: File) {
  console.log("Downloading file from MinIO...");

  // Download the file from MinIO
  const filePath = await downloadFromMinio(filekey, file);
  console.log(`File downloaded to: ${filePath}`);

  // Determine the correct loader based on file type
  let loader;
  const fileType = file.type;

  switch (fileType) {
    case "application/pdf":
      loader = new PDFLoader(filePath);
      break;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      loader = new DocxLoader(filePath);
      break;
    case "application/pptx":
      loader = new PPTXLoader(filePath);
      break;
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      loader = new XLSXLoader(filePath);
      break;
    case "text/plain":
      loader = new TextLoader(filePath);
      break;
    default:
      throw new Error(`Unsupported file type: ${fileType}`);
  }

  // Load the document using the appropriate loader
  const documents = await loader.load();
  
  // Generate embeddings using OpenAI's embeddings model
  const embeddings = new OpenAIEmbeddings();
  const vectorStore = new VectorStore(pinecone, embeddings);
  
  // Add documents to Pinecone vector store
  await vectorStore.addDocuments(documents);
  
  console.log("Documents added to Pinecone.");
}
