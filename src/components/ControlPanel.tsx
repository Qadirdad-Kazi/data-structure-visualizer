import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Gauge,
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
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={onPrevious}
            disabled={currentStep === 0}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Previous Step"
          >
            <SkipBack className="w-5 h-5 text-slate-700" />
          </button>

          {isPlaying ? (
            <button
              onClick={onPause}
              className="p-3 rounded-lg bg-orange-500 hover:bg-orange-600 transition-colors"
              title="Pause"
            >
              <Pause className="w-6 h-6 text-white" />
            </button>
          ) : (
            <button
              onClick={onPlay}
              className="p-3 rounded-lg bg-green-500 hover:bg-green-600 transition-colors"
              title="Play"
            >
              <Play className="w-6 h-6 text-white" />
            </button>
          )}

          <button
            onClick={onNext}
            disabled={currentStep === totalSteps - 1}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Next Step"
          >
            <SkipForward className="w-5 h-5 text-slate-700" />
          </button>

          <button
            onClick={onReset}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors ml-2"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Gauge className="w-5 h-5 text-slate-600" />
          <div className="flex gap-2">
            {[0.5, 1, 1.5, 2].map((s) => (
              <button
                key={s}
                onClick={() => onSpeedChange(s)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  speed === s
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {s}x
              </button>
            ))}
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
    </div>
  );
}
