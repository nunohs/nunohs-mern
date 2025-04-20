import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalForm from '../features/goals/components/GoalForm';
import GoalItem from '../features/goals/components/GoalItem';
import { useGoals } from '../features/goals/hooks/useGoals';
import { useAuth } from '../features/auth/hooks/useAuth';
import Spinner from '../shared/components/Spinner';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { goals, isLoading, error } = useGoals();

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome {user?.name}</h1>
        <p className="text-gray-600 mt-2">Goals Dashboard</p>
      </section>

      <GoalForm />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Goals</h2>
        
        {goals.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600">You have not set any goals yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard; 