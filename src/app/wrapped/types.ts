import React from 'react';

export type Slide = {
  ref: React.RefObject<HTMLDivElement>;
  pauseSlide?: () => void;
  resumeSlide?: () => void;
  nextSlide?: () => void;
  previousSlide?: () => void;
};
