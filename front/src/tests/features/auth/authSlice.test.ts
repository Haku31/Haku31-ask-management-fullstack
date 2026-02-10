import authReducer, { login, logout, checkAuth, clearError } from '@/features/auth/authSlice';
import { LoginResponse } from '@/features/auth/types/auth.types';

describe('authSlice', () => {
  const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle clearError', () => {
    const stateWithError = { ...initialState, error: 'Some error' };
    const actual = authReducer(stateWithError, clearError());
    expect(actual.error).toBeNull();
  });

  it('should handle login.pending', () => {
    const actual = authReducer(initialState, login.pending('', {} as any, {} as any));
    expect(actual.loading).toBe(true);
    expect(actual.error).toBeNull();
  });

  it('should handle login.fulfilled', () => {
    const loginResponse: LoginResponse = {
      token: 'test-token',
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      },
    };
    const actual = authReducer(
      initialState,
      login.fulfilled(loginResponse, '', {} as any, {} as any)
    );
    expect(actual.loading).toBe(false);
    expect(actual.isAuthenticated).toBe(true);
    expect(actual.user).toEqual(loginResponse.user);
    expect(actual.token).toBe(loginResponse.token);
    expect(actual.error).toBeNull();
  });

  it('should handle login.rejected', () => {
    const actual = authReducer(
      initialState,
      login.rejected(null, '', {} as any, 'Login failed', {} as any)
    );
    expect(actual.loading).toBe(false);
    expect(actual.isAuthenticated).toBe(false);
    expect(actual.error).toBeDefined();
  });

  it('should handle logout.fulfilled', () => {
    const authenticatedState = {
      ...initialState,
      user: { id: '1', email: 'test@example.com', name: 'Test' },
      token: 'test-token',
      isAuthenticated: true,
    };
    const actual = authReducer(authenticatedState, logout.fulfilled(undefined, '', undefined, {} as any));
    expect(actual.user).toBeNull();
    expect(actual.token).toBeNull();
    expect(actual.isAuthenticated).toBe(false);
  });

  it('should handle checkAuth.fulfilled', () => {
    const authData = {
      token: 'test-token',
      user: { id: '1', email: 'test@example.com', name: 'Test User' },
    };
    const actual = authReducer(
      initialState,
      checkAuth.fulfilled(authData, '', undefined, {} as any)
    );
    expect(actual.user).toEqual(authData.user);
    expect(actual.token).toBe(authData.token);
    expect(actual.isAuthenticated).toBe(true);
  });

  it('should handle checkAuth.rejected', () => {
    const actual = authReducer(
      initialState,
      checkAuth.rejected(null, '', undefined, 'No auth found', {} as any)
    );
    expect(actual.user).toBeNull();
    expect(actual.token).toBeNull();
    expect(actual.isAuthenticated).toBe(false);
  });
});

