import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import goalService, { GoalCreate } from '../services/goalService';
import { useAuth } from '../../auth/hooks/useAuth';
import { useState } from 'react';

export const useGoals = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  
  // Get all goals
  const { 
    data: goals = [], 
    isLoading,
    isError, 
  } = useQuery({
    queryKey: ['goals'],
    queryFn: () => {
      if (!user?.token) {
        throw new Error('You must be logged in');
      }
      return goalService.getGoals(user.token);
    },
    enabled: !!user?.token,
  });
  
  // Create a new goal
  const createGoalMutation = useMutation({
    mutationFn: (goalData: GoalCreate) => {
      if (!user?.token) {
        throw new Error('You must be logged in');
      }
      return goalService.createGoal(goalData, user.token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setError(null);
      toast.success('Goal created successfully!');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Failed to create goal';
      setError(errorMessage);
      toast.error(errorMessage);
    },
  });
  
  // Delete a goal
  const deleteGoalMutation = useMutation({
    mutationFn: (goalId: string) => {
      if (!user?.token) {
        throw new Error('You must be logged in');
      }
      return goalService.deleteGoal(goalId, user.token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setError(null);
      toast.success('Goal deleted successfully!');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Failed to delete goal';
      setError(errorMessage);
      toast.error(errorMessage);
    },
  });
  
  // Update a goal
  const updateGoalMutation = useMutation({
    mutationFn: ({ goalId, goalData }: { goalId: string; goalData: GoalCreate }) => {
      if (!user?.token) {
        throw new Error('You must be logged in');
      }
      return goalService.updateGoal(goalId, goalData, user.token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setError(null);
      toast.success('Goal updated successfully!');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Failed to update goal';
      setError(errorMessage);
      toast.error(errorMessage);
    },
  });
  
  // Clear error
  const clearError = () => {
    setError(null);
  };
  
  return {
    goals,
    isLoading,
    isError,
    error,
    createGoal: createGoalMutation.mutate,
    isCreating: createGoalMutation.isPending,
    deleteGoal: deleteGoalMutation.mutate,
    isDeleting: deleteGoalMutation.isPending,
    updateGoal: updateGoalMutation.mutate,
    isUpdating: updateGoalMutation.isPending,
    clearError,
  };
}; 