import { useState } from 'react';
import { useGoals } from '../hooks/useGoals';

const GoalForm = () => {
  const [text, setText] = useState('');
  const { createGoal, isCreating, error } = useGoals();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!text.trim()) return;
    
    createGoal({ text });
    setText('');
  };

  return (
    <section className="mb-8">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create a Goal</h2>
          <p className="text-gray-600">What do you want to achieve?</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <textarea
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your goal"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isCreating}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {isCreating ? 'Adding...' : 'Add Goal'}
        </button>
      </form>
    </section>
  );
};

export default GoalForm; 