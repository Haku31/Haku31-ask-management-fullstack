import { useAppSelector } from '@/app/hooks';

export const useAuth = () => {
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);

  return {
    user,
    isAuthenticated,
    loading,
  };
};

