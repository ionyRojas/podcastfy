"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function AudioFiles() {
  const [audioFiles, setAudioFiles] = useState<
    { audio: string; image: string }[]
  >([]);

  useEffect(() => {
    const fetchAudioFiles = async () => {
      const response = await fetch("/api/audio");
      const data = await response.json();
      if (response.ok) {
        setAudioFiles(data.audioFiles);
      } else {
        console.error("Failed to fetch audio files:", data.error);
      }
    };

    fetchAudioFiles();
  }, []);

  return (
    <div>
      <h1>Available Audio Files</h1>
      {audioFiles.length === 0 && <p>No audio files found.</p>}
      <ul>
        {audioFiles.map(({ audio, image }, index) => (
          <li key={index} style={{ marginBottom: "20px" }}>
            <p>{audio.split("/").pop()}</p>
            <Image
              src={image}
              alt="cover audio image"
              width={200}
              height={200}
            />
            <audio controls>
              <source src={audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
}
