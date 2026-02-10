import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useAuth } from '@/shared/hooks/useAuth';
import authReducer from '@/features/auth/authSlice';
import React from 'react';

describe('useAuth', () => {
  it('should return initial auth state', () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
        tasks: () => ({ tasks: [], loading: false, error: null, filters: { status: 'ALL', search: '' } }),
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.loading).toBe(false);
  });

  it('should return authenticated state', () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
        tasks: () => ({ tasks: [], loading: false, error: null, filters: { status: 'ALL', search: '' } }),
      },
      preloadedState: {
        auth: {
          user: { id: '1', email: 'test@example.com', name: 'Test User' },
          token: 'test-token',
          isAuthenticated: true,
          loading: false,
          error: null,
        },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toEqual({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
    });
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.loading).toBe(false);
  });
});
