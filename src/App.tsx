import React, { useState, useMemo } from 'react';
import { Moon, Sun, Trash2 } from 'lucide-react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { FilterBar } from './components/FilterBar';
import { Statistics } from './components/Statistics';
import { useTodos } from './hooks/useTodos';
import { FilterOptions } from './types';
import './App.css';

function App() {
  const {
    todos,
    loaded,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    getStatistics,
    clearCompleted,
  } = useTodos();

  const [darkMode, setDarkMode] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
  });

  const stats = useMemo(() => getStatistics(), [todos]);
  const categories = useMemo(() => {
    const cats = new Set(todos.map(t => t.category));
    return Array.from(cats).sort();
  }, [todos]);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-900">
        <div className="text-center">
          <p className="text-xl text-gray-600 dark:text-gray-400">加載中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
        <header className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-slate-800 dark:to-slate-900 text-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">📝 待辦事項</h1>
              <p className="text-blue-100 dark:text-gray-400 text-sm mt-1">
                現代化的任務管理應用
              </p>
            </div>

            <div className="flex items-center gap-4">
              {stats.completed > 0 && (
                <button
                  onClick={clearCompleted}
                  className="flex items-center gap-2 bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
                >
                  <Trash2 size={18} />
                  <span className="hidden sm:inline">清除已完成 ({stats.completed})</span>
                </button>
              )}

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 hover:bg-blue-400 dark:hover:bg-slate-700 rounded-lg transition-colors"
                title={darkMode ? '切換亮色模式' : '切換暗黑模式'}
              >
                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <Statistics stats={stats} />

          <TodoForm onAdd={addTodo} categories={categories} />

          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            categories={categories}
          />

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
            <TodoList
              todos={todos}
              filters={filters}
              onToggle={toggleComplete}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          </div>
        </main>

        <footer className="mt-12 py-6 text-center text-gray-600 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-slate-700">
          <p>📝 Todo List App v1.0.0 | 使用 React + TypeScript + Tailwind CSS</p>
          <p className="mt-2">💾 所有數據保存在本地存儲中</p>
        </footer>
      </div>
    </div>
  );
}

export default App;