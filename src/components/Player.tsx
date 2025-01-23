import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { Box, IconButton, Slider, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

type TProps = {
  selectedAudio: {
    audio: string;
    image: string;
  } | null;
};

const Player = ({ selectedAudio }: TProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current || !selectedAudio) return;

    audioRef.current.src = selectedAudio?.audio;
    audioRef.current.load();
    setIsPlaying(false);
  }, [selectedAudio]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    const currentTime = audioRef.current.currentTime;
    setProgress((currentTime / audioRef.current.duration) * 100 || 0);
  };

  const handleProgressChange = (e, newValue) => {
    if (!audioRef.current) return;

    const newTime = (audioRef.current.duration * newValue) / 100;
    audioRef.current.currentTime = newTime;
    setProgress(newValue);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;

    setDuration(audioRef.current.duration);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#181818a1",
        color: "white",
        padding: 2,
        borderRadius: 2,
        position: "fixed",
        bottom: 48,
        left: 48,
        right: 48,
        gap: "40px",
        flexDirection: {
          xs: "column",
          md: "row",
        },
      }}
    >
      <audio
        ref={audioRef}
        src={selectedAudio?.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <Box
        sx={{
          textAlign: "center",
          marginBottom: 2,
          maxWidth: { xs: "auto", md: 200 },
        }}
      >
        <Typography variant="h6" noWrap>
          {selectedAudio?.audio.split("/audio/").pop() || "Track Title"}
        </Typography>
        <Typography variant="subtitle2" color="rgb(255, 39, 91)" noWrap>
          Artist Name
        </Typography>
      </Box>

      <Box
        id="player-controls"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          columnGap: 2,
          width: "100%",
        }}
      >
        <Box>
          <IconButton
            onClick={() => console.log("Previous track")}
            color="primary"
          >
            <SkipPreviousIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton onClick={handlePlayPause} color="primary">
            {isPlaying ? (
              <PauseIcon sx={{ fontSize: 40, color: "white" }} />
            ) : (
              <PlayArrowIcon sx={{ fontSize: 40, color: "white" }} />
            )}
          </IconButton>
          <IconButton onClick={() => console.log("Next track")} color="primary">
            <SkipNextIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
        <Box sx={{ width: "100%", marginY: 2 }}>
          <Slider
            value={progress}
            onChange={handleProgressChange}
            sx={{
              color: "rgb(255, 39, 91)",
              "& .MuiSlider-thumb": {
                backgroundColor: "white",
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption">
              {formatTime((progress / 100) * duration)}
            </Typography>
            <Typography variant="caption">{formatTime(duration)}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Player;
