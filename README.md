# Data Structure Visualizer

An interactive web application for visualizing various data structures and algorithms in action. Built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Multiple Data Structures**: Visualize arrays, linked lists, stacks, queues, trees, and graphs
- **Interactive Controls**: Insert, delete, and search operations with real-time visualization
- **Step-by-Step Animation**: Watch algorithms execute step by step with visual feedback
- **Responsive Design**: Works on both desktop and mobile devices
- **Code View**: See the implementation details of each data structure

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v7 or higher) or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd data-structure-visualizer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your MongoDB connection string:
     ```
     MONGODB_URI=your_mongodb_connection_string
     ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **Frontend**:
  - React 18
  - TypeScript
  - Tailwind CSS
  - Vite
  - React Router

- **Backend**:
  - MongoDB (via MongoDB Atlas)

- **Development Tools**:
  - ESLint
  - Prettier
  - TypeScript

## 📂 Project Structure

```
src/
├── components/           # Reusable UI components
├── engine/              # Core data structure implementations
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [MongoDB](https://www.mongodb.com/)

---

Made with ❤️ by [Your Name]
