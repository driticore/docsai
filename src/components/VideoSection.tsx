"use client";

import ReactPlayer from "react-player";

export function VideoSection() {
  return (
      <ReactPlayer
      suppressHydrationWarning
        width="530px"
        height="300px"
        url="https://www.youtube.com/embed/Te_DTmOt4Xw"
      />

  );
}
