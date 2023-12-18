import React, { useEffect, useRef, useState } from 'react';
import { Slide } from '@/app/wrapped/types';

export function SliderIndicator({
  slide,
  active,
  previousSlide,
  nextSlide,
}: {
  slide: Slide;
  active?: boolean;
  previousSlide: () => void;
  nextSlide: () => void;
}) {
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const interval = useRef<Parameters<typeof clearInterval>[0]>(undefined);

  const pace = 0.5;

  useEffect(() => {
    if (active) {
      setCompletionPercentage(0);
      interval.current = setInterval(() => {
        setCompletionPercentage((completionPercentage) => {
          if (completionPercentage < 100) {
            return completionPercentage + pace;
          }
          return completionPercentage;
        });
      }, 100);

      slide.nextSlide = () => {
        clearInterval(interval.current);
        setCompletionPercentage(99);
        nextSlide();
      };

      slide.pauseSlide = () => {
        clearInterval(interval.current);
      };

      slide.resumeSlide = () => {
        interval.current = setInterval(() => {
          setCompletionPercentage((completionPercentage) => {
            if (completionPercentage < 100) {
              return completionPercentage + pace;
            }
            return completionPercentage;
          });
        }, 100);
      };
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [active]);

  useEffect(() => {
    if (completionPercentage >= 100) {
      clearInterval(interval.current);
      nextSlide();
    }

    // Set the new value of completionPercentage in callback.
    slide.previousSlide = () => {
      if (completionPercentage < 8) {
        previousSlide();
      }
      setCompletionPercentage(0);
    };
  }, [completionPercentage]);

  return (
    <div ref={slide.ref} className={'relative h-0.5 flex-1 rounded'}>
      <div
        className={'absolute z-10 h-full bg-white transition-all ease-in-out'}
        style={{
          width: `${completionPercentage}%`,
        }}
      ></div>
      <div className={'h-full w-full bg-gray-500 opacity-60'}></div>
    </div>
  );
}
