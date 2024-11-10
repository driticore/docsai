import { loadMinioIntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { file, file_key, file_name } = body;

        // Add logic here for handling file_key and file_name (e.g., storing in a database, etc.)
        const pages = await loadMinioIntoPinecone(file_key, file);

        // Return a successful response
        return NextResponse.json(
            { message: `${pages} File data received successfully`, file_key, file_name },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in POST /api/create-chats:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
