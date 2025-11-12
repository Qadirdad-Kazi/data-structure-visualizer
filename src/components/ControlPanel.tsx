import { useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Gauge,
  FastForward,
  Rewind,
} from 'lucide-react';

interface ControlPanelProps {
  isPlaying: boolean;
  speed: number;
  currentStep: number;
  totalSteps: number;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export default function ControlPanel({
  isPlaying,
  speed,
  currentStep,
  totalSteps,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onReset,
  onSpeedChange,
}: ControlPanelProps) {
  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        isPlaying ? onPause() : onPlay();
      } else if (e.code === 'ArrowRight') {
        onNext();
      } else if (e.code === 'ArrowLeft') {
        onPrevious();
      } else if (e.code === 'ArrowUp') {
        const newSpeed = Math.min(2, speed + 0.5);
        onSpeedChange(newSpeed);
      } else if (e.code === 'ArrowDown') {
        const newSpeed = Math.max(0.5, speed - 0.5);
        onSpeedChange(newSpeed);
      } else if (e.code === 'Home') {
        onReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, speed, onPlay, onPause, onNext, onPrevious, onReset, onSpeedChange]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{
            width: totalSteps > 0 ? `${((currentStep + 1) / totalSteps) * 100}%` : '0%',
            minWidth: '0.5rem'
          }}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* First Step */}
          <button
            onClick={onReset}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
            title="Reset to beginning (Home)"
          >
            <SkipBack className="w-5 h-5 text-slate-700" />
          </button>

          {/* Previous Step */}
          <button
            onClick={onPrevious}
            disabled={currentStep === 0}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Previous step (←)"
          >
            <Rewind className="w-5 h-5 text-slate-700" />
          </button>

          {/* Play/Pause */}
          {isPlaying ? (
            <button
              onClick={onPause}
              className="p-3 rounded-lg bg-orange-500 hover:bg-orange-600 transition-colors"
              title="Pause (Space)"
            >
              <Pause className="w-6 h-6 text-white" />
            </button>
          ) : (
            <button
              onClick={onPlay}
              className="p-3 rounded-lg bg-green-500 hover:bg-green-600 transition-colors"
              title="Play (Space)"
            >
              <Play className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Next Step */}
          <button
            onClick={onNext}
            disabled={currentStep >= totalSteps - 1}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Next step (→)"
          >
            <FastForward className="w-5 h-5 text-slate-700" />
          </button>

          {/* Last Step */}
          <button
            onClick={() => {
              // Fast forward to last step
              while (currentStep < totalSteps - 1) {
                onNext();
              }
            }}
            disabled={currentStep >= totalSteps - 1}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Go to last step"
          >
            <SkipForward className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-3">
          <Gauge className="w-5 h-5 text-slate-600" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSpeedChange(Math.max(0.5, speed - 0.5))}
              disabled={speed <= 0.5}
              className="p-1 text-slate-500 hover:text-slate-700 disabled:opacity-30"
              title="Decrease speed (↓)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </button>
            
            <div className="w-16 text-center text-sm font-medium">
              {speed.toFixed(1)}x
            </div>
            
            <button
              onClick={() => onSpeedChange(Math.min(2, speed + 0.5))}
              disabled={speed >= 2}
              className="p-1 text-slate-500 hover:text-slate-700 disabled:opacity-30"
              title="Increase speed (↑)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Progress</span>
          <span>
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0}%`,
            }}
          />
        </div>
      </div>
      
      <div className="pt-2 text-xs text-gray-500 text-center">
        <span className="hidden sm:inline">Keyboard shortcuts: </span>
        <span className="inline-flex flex-wrap justify-center gap-2 mt-1">
          <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">Space</kbd>
          <span>Play/Pause</span>
          <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">← →</kbd>
          <span>Step</span>
          <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">↑ ↓</kbd>
          <span>Speed</span>
          <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">Home</kbd>
          <span>Reset</span>
        </span>
      </div>
    </div>
  );
}
