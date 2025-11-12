import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

// Algorithm implementations
const sortingAlgorithms = {
  bubbleSort: async (arr: number[], updateArray: (arr: number[]) => Promise<void>) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
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

const SortingVisualizer = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState<AlgorithmKey>('bubbleSort');
  const [arraySize, setArraySize] = useState(30);
  const [speed, setSpeed] = useState(50);

  // Initialize array
  const resetArray = useCallback(() => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(5, 100));
    }
    setArray(newArray);
  }, [arraySize]);

  // Generate random number between min and max (inclusive)
  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Handle sort button click
  const handleSort = async () => {
    if (isSorting) return;
    
    setIsSorting(true);
    const arrayCopy = [...array];
    
    try {
      await sortingAlgorithms[algorithm](
        arrayCopy,
        async (newArray) => {
          setArray([...newArray]);
          await new Promise(resolve => setTimeout(resolve, 100 - speed));
        }
      );
    } catch (error) {
      console.error('Sorting error:', error);
    } finally {
      setIsSorting(false);
    }
  };

  // Initialize array on mount and when arraySize changes
  useEffect(() => {
    resetArray();
  }, [resetArray]);

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
        
        {/* Algorithm Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-lg mb-2">
            {algorithm === 'bubbleSort' && 'Bubble Sort'}
            {algorithm === 'quickSort' && 'Quick Sort'}
            {algorithm === 'mergeSort' && 'Merge Sort'}
            {algorithm === 'selectionSort' && 'Selection Sort'}
          </h3>
          <p className="text-gray-700 text-sm">
            {algorithm === 'bubbleSort' && 
              'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'}
            {algorithm === 'quickSort' && 
              'A divide-and-conquer algorithm that selects a pivot element and partitions the array around the pivot.'}
            {algorithm === 'mergeSort' && 
              'A divide-and-conquer algorithm that divides the input array into two halves, sorts them, and then merges them.'}
            {algorithm === 'selectionSort' && 
              'Repeatedly finds the minimum element from the unsorted part and puts it at the beginning.'}
          </p>
          <div className="mt-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2">
              {algorithm === 'bubbleSort' && 'Time: O(n²)'}
              {algorithm === 'quickSort' && 'Time: O(n log n) average, O(n²) worst'}
              {algorithm === 'mergeSort' && 'Time: O(n log n)'}
              {algorithm === 'selectionSort' && 'Time: O(n²)'}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
              {algorithm === 'bubbleSort' && 'Space: O(1)'}
              {algorithm === 'quickSort' && 'Space: O(log n)'}
              {algorithm === 'mergeSort' && 'Space: O(n)'}
              {algorithm === 'selectionSort' && 'Space: O(1)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
