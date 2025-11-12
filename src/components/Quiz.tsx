import { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { DataStructureType } from '../types';

interface QuizProps {
  dataStructure: DataStructureType;
  onClose: () => void;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizData: Record<DataStructureType, Question[]> = {
  array: [
    {
      id: 'array-1',
      question: 'What is the time complexity of accessing an element by index in an array?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      correctAnswer: 0,
      explanation: 'Arrays provide constant time O(1) access because elements are stored contiguously in memory.',
    },
    {
      id: 'array-2',
      question: 'What happens when you insert an element in the middle of an array?',
      options: [
        'Nothing, instant insertion',
        'All elements after the insertion point must be shifted',
        'The array doubles in size',
        'Elements before are shifted',
      ],
      correctAnswer: 1,
      explanation: 'When inserting in the middle, all subsequent elements must be shifted right, making it O(n).',
    },
  ],
  'linked-list': [
    {
      id: 'll-1',
      question: 'What is the time complexity of inserting at the head of a linked list?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      correctAnswer: 0,
      explanation: 'Inserting at the head only requires updating the head pointer, which is O(1).',
    },
    {
      id: 'll-2',
      question: 'What is the main advantage of a linked list over an array?',
      options: [
        'Faster access time',
        'Dynamic size without shifting elements',
        'Less memory usage',
        'Better cache locality',
      ],
      correctAnswer: 1,
      explanation: 'Linked lists can grow dynamically and insert/delete without shifting elements.',
    },
  ],
  stack: [
    {
      id: 'stack-1',
      question: 'What does LIFO stand for?',
      options: [
        'Last In First Out',
        'Last In Forever Out',
        'Linear In First Out',
        'List In First Out',
      ],
      correctAnswer: 0,
      explanation: 'LIFO means the last element added is the first one to be removed.',
    },
    {
      id: 'stack-2',
      question: 'Which operation is NOT typically supported by a stack?',
      options: ['Push', 'Pop', 'Peek', 'Random Access'],
      correctAnswer: 3,
      explanation: 'Stacks only allow access to the top element, not random access to any position.',
    },
  ],
  queue: [
    {
      id: 'queue-1',
      question: 'What does FIFO stand for?',
      options: [
        'First In First Out',
        'First In Forever Out',
        'Fast In Fast Out',
        'Final In First Out',
      ],
      correctAnswer: 0,
      explanation: 'FIFO means the first element added is the first one to be removed.',
    },
    {
      id: 'queue-2',
      question: 'In which end do we remove elements from a queue?',
      options: ['Rear', 'Front', 'Middle', 'Any position'],
      correctAnswer: 1,
      explanation: 'Elements are removed from the front (dequeue operation).',
    },
  ],
  'binary-tree': [
    {
      id: 'bt-1',
      question: 'What is the maximum number of children a node can have in a binary tree?',
      options: ['1', '2', '3', 'Unlimited'],
      correctAnswer: 1,
      explanation: 'A binary tree node can have at most 2 children: left and right.',
    },
    {
      id: 'bt-2',
      question: 'In an inorder traversal of a binary tree, what is the order?',
      options: [
        'Root → Left → Right',
        'Left → Root → Right',
        'Left → Right → Root',
        'Right → Root → Left',
      ],
      correctAnswer: 1,
      explanation: 'Inorder traversal visits nodes in Left → Root → Right order.',
    },
  ],
  bst: [
    {
      id: 'bst-1',
      question: 'What is the key property of a Binary Search Tree?',
      options: [
        'All nodes have two children',
        'Left child < Parent < Right child',
        'Height is always balanced',
        'All leaves are at the same level',
      ],
      correctAnswer: 1,
      explanation: 'In a BST, the left subtree contains smaller values and right subtree contains larger values.',
    },
    {
      id: 'bst-2',
      question: 'What is the average time complexity of search in a BST?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctAnswer: 1,
      explanation: 'BST search is O(log n) on average by eliminating half the tree at each step.',
    },
  ],
  graph: [
    {
      id: 'graph-1',
      question: 'What does BFS stand for?',
      options: [
        'Breadth First Search',
        'Best First Search',
        'Binary First Search',
        'Branch First Search',
      ],
      correctAnswer: 0,
      explanation: 'BFS explores all neighbors at the current depth before moving deeper.',
    },
    {
      id: 'graph-2',
      question: 'Which data structure is used in BFS traversal?',
      options: ['Stack', 'Queue', 'Array', 'Tree'],
      correctAnswer: 1,
      explanation: 'BFS uses a queue to track nodes to visit in FIFO order.',
    },
  ],
};

export default function Quiz({ dataStructure, onClose }: QuizProps) {
  const questions = quizData[dataStructure] || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(questions.length).fill(false)
  );

  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Quiz Mode</h2>
          <p className="text-slate-600 mb-6">
            No quiz questions available for this data structure yet.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const hasAnswered = answeredQuestions[currentQuestion];

  function handleAnswer(index: number) {
    if (hasAnswered) return;

    setSelectedAnswer(index);
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);

    if (index === question.correctAnswer) {
      setScore(score + 1);
    }
  }

  function handleNext() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  }

  function handleReset() {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(questions.length).fill(false));
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8">
          <div className="text-center">
            <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${
              percentage >= 70 ? 'bg-green-100' : 'bg-orange-100'
            }`}>
              <span className="text-4xl font-bold text-slate-800">
                {percentage}%
              </span>
            </div>

            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Quiz Complete!
            </h2>

            <p className="text-xl text-slate-600 mb-6">
              You scored {score} out of {questions.length}
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Retake Quiz
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-slate-500 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800">Quiz Mode</h2>
            <span className="text-sm text-slate-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mb-6">
            {question.question}
          </h3>

          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={hasAnswered}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  hasAnswered
                    ? index === question.correctAnswer
                      ? 'bg-green-50 border-green-500'
                      : index === selectedAnswer
                        ? 'bg-red-50 border-red-500'
                        : 'bg-slate-50 border-slate-200'
                    : 'bg-white border-slate-300 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-800">{option}</span>
                  {hasAnswered && index === question.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {hasAnswered &&
                    index === selectedAnswer &&
                    index !== question.correctAnswer && (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                </div>
              </button>
            ))}
          </div>

          {hasAnswered && (
            <div
              className={`p-4 rounded-lg mb-6 ${
                isCorrect ? 'bg-green-50 border-l-4 border-green-500' : 'bg-blue-50 border-l-4 border-blue-500'
              }`}
            >
              <p className="text-slate-700">{question.explanation}</p>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
            {hasAnswered && (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
