import { readdir } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

const AUDIO_DIR = join(process.cwd(), "public/audio");

const randomImage = () => Math.floor(Math.random() * 500);

export async function GET() {
  try {
    const files = await readdir(AUDIO_DIR);
    // TODO: this info should be stored in a large object store like S3
    //  but getting from local file system for demo purposes
    const audioFiles = files.map((file) => ({
      audio: `/audio/${file}`,
      image: `https://picsum.photos/id/${randomImage()}/200/200`,
    }));

    return NextResponse.json({ audioFiles });
  } catch (error) {
    console.error("Error reading audio directory:", error);
    return NextResponse.json(
      { error: "Failed to retrieve audio files" },
      { status: 500 }
    );
  }
}
