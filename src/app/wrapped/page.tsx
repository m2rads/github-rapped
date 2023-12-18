'use client';
import React, { createRef, useRef, useState } from 'react';
import { RightArrowIcon, LeftArrowIcon, PauseIcon, PlayIcon } from './Icons';
import { SliderIndicator } from '@/app/wrapped/SliderIndicator';
import { Slide } from '@/app/wrapped/types';

function createNewSlide(): Slide {
  return {
    ref: createRef<HTMLDivElement>(),
  };
}

export default function WrappedPage() {
  const slides = useRef([
    createNewSlide(),
    createNewSlide(),
    createNewSlide(),
    createNewSlide(),
  ]).current;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentSlide = slides[currentSlideIndex];

  return (
    <div className={'flex h-full flex-col'}>
      <div className={'mt-5 flex w-full gap-0.5 px-5'}>
        {Array.from({ length: slides.length }).map((_, i) => (
          <SliderIndicator
            slide={slides[i]}
            key={`si${i}`}
            active={currentSlideIndex === i}
            previousSlide={() => {
              if (currentSlideIndex > 0) {
                setCurrentSlideIndex(currentSlideIndex - 1);
              }
            }}
            nextSlide={() => {
              if (currentSlideIndex < slides.length - 1) {
                setCurrentSlideIndex(currentSlideIndex + 1);
              }
            }}
          />
        ))}
      </div>

      <div className={'mb-5 mt-10 flex justify-between px-10'}>
        <div className={''}>Logo</div>

        <div
          className={'flex h-12 w-12 cursor-pointer gap-5 p-2 hover:opacity-90'}
          onClick={() => {
            setIsPaused(!isPaused);
            if (isPaused) {
              currentSlide.resumeSlide?.();
            } else {
              currentSlide.pauseSlide?.();
            }
          }}
        >
          {isPaused ? <PlayIcon /> : <PauseIcon />}
        </div>
      </div>

      <div className={'flex justify-center'}>
        <div className={'flex items-center gap-5'}>
          <div
            className={'h-6 w-6 cursor-pointer'}
            onClick={() => {
              currentSlide.previousSlide?.();
            }}
          >
            <LeftArrowIcon />
          </div>
          <div
            className={
              'aspect-[0.561] w-[426px] bg-red-400 shadow-[inset_0_0_21px_5px_rgba(0,0,0,0.5)] md:shadow-none'
            }
          ></div>
          <div
            className={'h-6 w-6 cursor-pointer'}
            onClick={() => {
              currentSlide.nextSlide?.();
            }}
          >
            <RightArrowIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
