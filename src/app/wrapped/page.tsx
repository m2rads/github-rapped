'use client';
import React, { createRef, useRef, useState } from 'react';
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

export function RightArrowIcon() {
  return (
    <svg
      data-encore-id='icon'
      fill={'white'}
      role='img'
      aria-hidden='true'
      viewBox='0 0 24 24'
      className='Svg-sc-ytk21e-0 fviPxI'
    >
      <path d='M10.228 7.293a1 1 0 0 0 0 1.414L13.52 12l-3.293 3.293a1 1 0 1 0 1.414 1.414L16.349 12l-4.707-4.707a1 1 0 0 0-1.414 0z'></path>
      <path d='M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0zM12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1z'></path>
    </svg>
  );
}

export function LeftArrowIcon() {
  return (
    <svg
      data-encore-id='icon'
      fill={'white'}
      role='img'
      aria-hidden='true'
      viewBox='0 0 24 24'
      className='Svg-sc-ytk21e-0 fviPxI'
    >
      <path d='M13.772 7.293a1 1 0 0 1 0 1.414L10.48 12l3.293 3.293a1 1 0 0 1-1.414 1.414L7.651 12l4.707-4.707a1 1 0 0 1 1.414 0z'></path>
      <path d='M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0zm9-11C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1z'></path>
    </svg>
  );
}

export function PauseIcon() {
  return (
    <svg
      data-encore-id='icon'
      fill={'white'}
      role='img'
      aria-hidden='true'
      viewBox='0 0 24 24'
      className='Svg-sc-ytk21e-0 fLlswU'
    >
      <path d='M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z'></path>
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg
      data-encore-id='icon'
      fill={'white'}
      role='img'
      aria-hidden='true'
      viewBox='0 0 24 24'
      className='Svg-sc-ytk21e-0 fLlswU'
    >
      <path d='m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z'></path>
    </svg>
  );
}
