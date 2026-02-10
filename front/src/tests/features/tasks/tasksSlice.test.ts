import tasksReducer, {
  setFilters,
  clearError,
  fetchTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} from '@/features/tasks/tasksSlice';
import { Task, TaskStatus } from '@/features/tasks/types/task.types';

describe('tasksSlice', () => {
  const initialState = {
    tasks: [],
    loading: false,
    error: null,
    filters: {
      status: 'ALL' as const,
      search: '',
    },
  };

  it('should return the initial state', () => {
    expect(tasksReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setFilters', () => {
    const actual = tasksReducer(
      initialState,
      setFilters({ status: 'TODO', search: 'test' })
    );
    expect(actual.filters).toEqual({ status: 'TODO', search: 'test' });
  });

  it('should handle clearError', () => {
    const stateWithError = { ...initialState, error: 'Some error' };
    const actual = tasksReducer(stateWithError, clearError());
    expect(actual.error).toBeNull();
  });

  it('should handle fetchTasks.pending', () => {
    const actual = tasksReducer(initialState, fetchTasks.pending('', undefined, {} as any));
    expect(actual.loading).toBe(true);
    expect(actual.error).toBeNull();
  });

  it('should handle fetchTasks.fulfilled', () => {
    const tasks: Task[] = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        status: 'TODO',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
    ];
    const actual = tasksReducer(
      initialState,
      fetchTasks.fulfilled(tasks, '', undefined, {} as any)
    );
    expect(actual.loading).toBe(false);
    expect(actual.tasks).toEqual(tasks);
  });

  it('should handle fetchTasks.rejected', () => {
    const actual = tasksReducer(
      initialState,
      fetchTasks.rejected(null, '', undefined, 'Error loading tasks', {} as any)
    );
    expect(actual.loading).toBe(false);
    expect(actual.error).toBeDefined();
  });

  it('should handle createTask.fulfilled', () => {
    const newTask: Task = {
      id: '2',
      title: 'New Task',
      description: 'New Description',
      status: 'TODO',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-02',
    };
    const actual = tasksReducer(
      initialState,
      createTask.fulfilled(newTask, '', {} as any, {} as any)
    );
    expect(actual.tasks).toHaveLength(1);
    expect(actual.tasks[0]).toEqual(newTask);
  });

  it('should handle deleteTask.fulfilled', () => {
    const stateWithTask = {
      ...initialState,
      tasks: [
        {
          id: '1',
          title: 'Task 1',
          description: 'Description',
          status: 'TODO' as TaskStatus,
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
      ],
    };
    const actual = tasksReducer(
      stateWithTask,
      deleteTask.fulfilled('1', '', '1', {} as any)
    );
    expect(actual.tasks).toHaveLength(0);
  });

  it('should handle updateTaskStatus.fulfilled', () => {
    const existingTask: Task = {
      id: '1',
      title: 'Task 1',
      description: 'Description',
      status: 'TODO',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    };
    const stateWithTask = {
      ...initialState,
      tasks: [existingTask],
    };
    const updatedTask = { ...existingTask, status: 'COMPLETED' as TaskStatus };
    const actual = tasksReducer(
      stateWithTask,
      updateTaskStatus.fulfilled(updatedTask, '', { taskId: '1', status: { status: 'COMPLETED' } }, {} as any)
    );
    expect(actual.tasks[0].status).toBe('COMPLETED');
  });
});

