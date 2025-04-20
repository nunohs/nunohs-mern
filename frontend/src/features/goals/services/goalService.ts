import axios from 'axios';

// Define types
export interface Goal {
  _id: string;
  text: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoalCreate {
  text: string;
}

// API URL
const API_URL = '/api/goals/';

// Get token from auth header
const getAuthHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Create new goal
const createGoal = async (goalData: GoalCreate, token: string): Promise<Goal> => {
  const config = getAuthHeader(token);
  const response = await axios.post<Goal>(API_URL, goalData, config);
  return response.data;
};

// Get user goals
const getGoals = async (token: string): Promise<Goal[]> => {
  const config = getAuthHeader(token);
  const response = await axios.get<Goal[]>(API_URL, config);
  return response.data;
};

// Delete user goal
const deleteGoal = async (goalId: string, token: string): Promise<{ id: string }> => {
  const config = getAuthHeader(token);
  const response = await axios.delete<{ id: string }>(`${API_URL}${goalId}`, config);
  return response.data;
};

// Update user goal
const updateGoal = async (goalId: string, goalData: GoalCreate, token: string): Promise<Goal> => {
  const config = getAuthHeader(token);
  const response = await axios.put<Goal>(`${API_URL}${goalId}`, goalData, config);
  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
  updateGoal,
};

export default goalService; 