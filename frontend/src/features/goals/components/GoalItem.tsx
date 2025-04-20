import { useState } from 'react';
import { Goal } from '../services/goalService';
import { useGoals } from '../hooks/useGoals';

interface GoalItemProps {
  goal: Goal;
}

const GoalItem = ({ goal }: GoalItemProps) => {
  const { deleteGoal, updateGoal, isDeleting, isUpdating } = useGoals();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(goal.text);
  
  const handleDelete = () => {
    deleteGoal(goal._id);
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleCancel = () => {
    setText(goal.text);
    setIsEditing(false);
  };
  
  const handleSave = () => {
    if (text.trim()) {
      updateGoal({ goalId: goal._id, goalData: { text } });
      setIsEditing(false);
    }
  };
  
  const formattedDate = new Date(goal.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-start">
        {isEditing ? (
          <div className="w-full">
            <textarea
              className="w-full p-2 border rounded-md"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
            />
            <div className="flex mt-2 space-x-2">
              <button 
                onClick={handleSave}
                disabled={isUpdating}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50"
              >
                Save
              </button>
              <button 
                onClick={handleCancel}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <p className="text-gray-800">{goal.text}</p>
              <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleEdit}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-red-500 hover:text-red-700 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GoalItem; 