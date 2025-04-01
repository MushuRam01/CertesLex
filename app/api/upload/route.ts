import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { file } = await req.json(); // Expecting base64 encoded file
  const drive = google.drive({ version: "v3", auth: session.accessToken });

  try {
    const response = await drive.files.create({
      requestBody: {
        name: "UploadedFile.docx",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
      media: {
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        body: Buffer.from(file, "base64"),
      },
    });

    return NextResponse.json({ success: true, fileId: response.data.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
