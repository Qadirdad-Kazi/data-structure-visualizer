import { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, BarChart2, Clock, Cpu, GitCompare } from 'lucide-react';

// Helper function to format time
const formatTime = (ms: number): string => {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
};

// Algorithm implementations
const sortingAlgorithms = {
  bubbleSort: async (arr: number[], updateArray: (arr: number[]) => Promise<void>) => {
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        if (arr[j] > arr[j + 1]) {
          swaps++;
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          await updateArray([...arr]);
        }
      }
    }
  },
  
  quickSort: async (arr: number[], updateArray: (arr: number[]) => Promise<void>) => {
    const partition = async (low: number, high: number): Promise<number> => {
      const pivot = arr[high];
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          await updateArray([...arr]);
        }
      }
      
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      await updateArray([...arr]);
      return i + 1;
    };

    const quickSortHelper = async (low: number, high: number) => {
      if (low < high) {
        const pi = await partition(low, high);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
      }
    };

    await quickSortHelper(0, arr.length - 1);
  },
  
  mergeSort: async (arr: number[], updateArray: (arr: number[]) => Promise<void>) => {
    const merge = async (l: number, m: number, r: number) => {
      const n1 = m - l + 1;
      const n2 = r - m;
      
      const L = new Array(n1);
      const R = new Array(n2);
      
      for (let i = 0; i < n1; i++) L[i] = arr[l + i];
      for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
      
      let i = 0, j = 0, k = l;
      
      while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        await updateArray([...arr]);
        k++;
      }
      
      while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
        await updateArray([...arr]);
      }
      
      while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
        await updateArray([...arr]);
      }
    };

    const mergeSortHelper = async (l: number, r: number) => {
      if (l < r) {
        const m = Math.floor((l + r) / 2);
        await mergeSortHelper(l, m);
        await mergeSortHelper(m + 1, r);
        await merge(l, m, r);
      }
    };

    await mergeSortHelper(0, arr.length - 1);
  },
  
  selectionSort: async (arr: number[], updateArray: (arr: number[]) => Promise<void>) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      await updateArray([...arr]);
    }
  },
};

type AlgorithmKey = keyof typeof sortingAlgorithms;

interface Metrics {
  comparisons: number;
  swaps: number;
  startTime: number | null;
  endTime: number | null;
  isSorting: boolean;
}

const timeComplexity = {
  bubbleSort: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
  quickSort: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
  mergeSort: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
  selectionSort: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
} as const;

const spaceComplexity = {
  bubbleSort: 'O(1)',
  quickSort: 'O(log n)',
  mergeSort: 'O(n)',
  selectionSort: 'O(1)',
} as const;

const SortingVisualizer = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState<AlgorithmKey>('bubbleSort');
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(50);
  const [metrics, setMetrics] = useState<Metrics>({
    comparisons: 0,
    swaps: 0,
    startTime: null,
    endTime: null,
    isSorting: false,
  });
  
  const animationFrameId = useRef<number>();
  
  // Reset metrics
  const resetMetrics = useCallback(() => {
    setMetrics({
      comparisons: 0,
      swaps: 0,
      startTime: null,
      endTime: null,
      isSorting: false,
    });
  }, []);
  
  // Update metrics
  const updateMetrics = useCallback((updates: Partial<Metrics>) => {
    setMetrics(prev => ({
      ...prev,
      ...updates,
    }));
  }, []);

  // Initialize array
  const resetArray = useCallback(() => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(5, 100));
    }
    setArray(newArray);
    resetMetrics();
  }, [arraySize, resetMetrics]);
  
  // Extract sorting algorithms from the object
  const {
    bubbleSort,
    quickSort,
    mergeSort,
    selectionSort
  } = sortingAlgorithms;

  // Generate random number between min and max (inclusive)
  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Handle sort button click
  const handleSort = async () => {
    if (isSorting) return;
    
    setIsSorting(true);
    const arrayCopy = [...array];
    const startTime = performance.now();
    
    updateMetrics({
      comparisons: 0,
      swaps: 0,
      startTime,
      endTime: null,
      isSorting: true,
    });
    
    try {
      // Wrap the sorting algorithm to track metrics
      const trackedAlgorithm = async () => {
        let comparisons = 0;
        let swaps = 0;
        
        const trackedUpdateArray = async (newArray: number[]) => {
          setArray([...newArray]);
          
          // Update metrics in the next animation frame for better performance
          animationFrameId.current = requestAnimationFrame(() => {
            updateMetrics({
              comparisons,
              swaps,
            });
          });
          
          await new Promise(resolve => setTimeout(resolve, 100 - speed));
        };
        
        // Create a proxy to track array accesses and modifications
        const handler = {
          get: function(target: any, prop: string | symbol) {
            if (typeof prop === 'string' && /^\d+$/.test(prop)) {
              comparisons++;
            }
            return target[prop];
          },
          set: function(target: any, prop: string | symbol, value: any) {
            if (typeof prop === 'string' && /^\d+$/.test(prop)) {
              swaps++;
            }
            target[prop] = value;
            return true;
          }
        };
        
        const trackedArray = new Proxy(arrayCopy, handler);
        
        // Run the actual sorting algorithm with tracking
        if (algorithm === 'bubbleSort') {
          await bubbleSort(trackedArray, trackedUpdateArray);
        } else if (algorithm === 'quickSort') {
          await quickSort(trackedArray, trackedUpdateArray);
        } else if (algorithm === 'mergeSort') {
          await mergeSort(trackedArray, trackedUpdateArray);
        } else if (algorithm === 'selectionSort') {
          await selectionSort(trackedArray, trackedUpdateArray);
        }
      };
      
      await trackedAlgorithm();
      
    } catch (error) {
      console.error('Sorting error:', error);
    } finally {
      const endTime = performance.now();
      updateMetrics({
        endTime,
        isSorting: false,
      });
      setIsSorting(false);
    }
  };

  // Initialize array on mount and when arraySize or algorithm changes
  useEffect(() => {
    resetArray();
  }, [arraySize, algorithm, resetArray]);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Sorting Algorithm Visualizer</h2>
        
        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Algorithm
            </label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as AlgorithmKey)}
              disabled={isSorting}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="bubbleSort">Bubble Sort</option>
              <option value="quickSort">Quick Sort</option>
              <option value="mergeSort">Merge Sort</option>
              <option value="selectionSort">Selection Sort</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Array Size: {arraySize}
            </label>
            <input
              type="range"
              min="5"
              max="100"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              disabled={isSorting}
              className="w-full"
            />
          </div>
          
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Speed: {speed}ms
            </label>
            <input
              type="range"
              min="0"
              max="95"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              disabled={isSorting}
              className="w-full"
            />
          </div>
          
          <div className="flex items-end gap-2">
            <button
              onClick={resetArray}
              disabled={isSorting}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center gap-2 disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={handleSort}
              disabled={isSorting}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2 disabled:opacity-50"
            >
              {isSorting ? (
                <>
                  <Pause className="w-4 h-4" />
                  Sorting...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Sort
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Visualization */}
        <div className="h-64 w-full flex items-end gap-px bg-gray-100 p-4 rounded-md">
          {array.map((value, idx) => (
            <div
              key={idx}
              className="bg-blue-500 flex-1 rounded-t-sm"
              style={{
                height: `${value}%`,
                backgroundColor: isSorting ? '#3b82f6' : '#2563eb',
                transition: 'height 0.1s ease, background-color 0.3s ease',
              }}
            />
          ))}
        </div>
        
        {/* Performance Metrics */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
            <BarChart2 className="w-5 h-5" />
            Performance Metrics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Real-time Metrics */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <GitCompare className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Comparisons:</span>
                <span className="ml-auto font-mono">{metrics.comparisons.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
                <span className="font-medium">Swaps:</span>
                <span className="ml-auto font-mono">{metrics.swaps.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-purple-500" />
                <span className="font-medium">Time:</span>
                <span className="ml-auto font-mono">
                  {metrics.startTime && metrics.endTime 
                    ? formatTime(metrics.endTime - metrics.startTime)
                    : metrics.startTime 
                      ? formatTime(performance.now() - metrics.startTime)
                      : '0ms'}
                </span>
              </div>
            </div>
            
            {/* Complexity Analysis */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Cpu className="w-4 h-4 text-orange-500" />
                <span className="font-medium">Time Complexity:</span>
                <div className="ml-auto flex gap-1">
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                    Best: {timeComplexity[algorithm].best}
                  </span>
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">
                    Avg: {timeComplexity[algorithm].average}
                  </span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded">
                    Worst: {timeComplexity[algorithm].worst}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                </svg>
                <span className="font-medium">Space Complexity:</span>
                <span className="ml-auto px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                  {spaceComplexity[algorithm]}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="font-medium">Current Speed:</span>
                <span className="ml-auto font-mono">{(speed / 10).toFixed(1)}x</span>
              </div>
            </div>
          </div>
          
          {/* Algorithm Info */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-medium mb-2">
              {algorithm === 'bubbleSort' && 'Bubble Sort'}
              {algorithm === 'quickSort' && 'Quick Sort'}
              {algorithm === 'mergeSort' && 'Merge Sort'}
              {algorithm === 'selectionSort' && 'Selection Sort'}
            </h4>
            <p className="text-sm text-gray-600">
              {algorithm === 'bubbleSort' && 
                'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'}
              {algorithm === 'quickSort' && 
                'A divide-and-conquer algorithm that selects a pivot element and partitions the array around the pivot.'}
              {algorithm === 'mergeSort' && 
                'A divide-and-conquer algorithm that divides the input array into two halves, sorts them, and then merges them.'}
              {algorithm === 'selectionSort' && 
                'Repeatedly finds the minimum element from the unsorted part and puts it at the beginning.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
