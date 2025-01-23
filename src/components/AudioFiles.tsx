"use client";
import Player from "@/components/Player";
import { Card, CardContent, CardMedia, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type TAudioFile = {
  audio: string;
  image: string;
};

export default function AudioFiles() {
  const [audioFiles, setAudioFiles] = useState<TAudioFile[]>([]);
  const [selectedAudio, setSelectedAudio] = useState<TAudioFile | null>(null);

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

  const handleAudioSelect = (audio: TAudioFile) => {
    setSelectedAudio(audio);
  };

  return (
    <div>
      {audioFiles.length === 0 && (
        <Typography variant="body1" sx={{ textAlign: "center", marginTop: 4 }}>
          No audio files found.
        </Typography>
      )}

      <Grid2 container spacing={3} sx={{ marginTop: 2 }}>
        {audioFiles.map(({ audio, image }, index) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card
              sx={{
                cursor: "pointer",
                boxShadow:
                  selectedAudio?.audio === audio ? "0 0 10px #ff275b" : "none",
                border:
                  selectedAudio?.audio === audio ? "2px solid #ff275b" : "none",
                transition: "all 0.3s ease",
              }}
              onClick={() => handleAudioSelect({ audio, image })}
            >
              <CardMedia
                component="img"
                height="200"
                width="200"
                image={image}
                alt="Audio cover"
              />
              <CardContent>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {audio.split("/").pop()}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <Player selectedAudio={selectedAudio} />
    </div>
  );
}
