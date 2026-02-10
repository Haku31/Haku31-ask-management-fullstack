import { render, screen, fireEvent } from '@testing-library/react';
import { TaskCard } from '@/features/tasks/components/TaskCard';
import { Task } from '@/features/tasks/types/task.types';

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'This is a test task description',
  status: 'TODO',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

describe('TaskCard', () => {
  const mockOnDelete = jest.fn();
  const mockOnUpdateStatus = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render task details correctly', () => {
    render(
      <TaskCard
        task={mockTask}
        onDelete={mockOnDelete}
        onUpdateStatus={mockOnUpdateStatus}
      />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('This is a test task description')).toBeInTheDocument();
    expect(screen.getByText('Por Hacer')).toBeInTheDocument();
  });

  it('should call onDelete when delete button is clicked', () => {
    render(
      <TaskCard
        task={mockTask}
        onDelete={mockOnDelete}
        onUpdateStatus={mockOnUpdateStatus}
      />
    );

    const deleteButton = screen.getByLabelText('Eliminar tarea');
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('should display correct status chip color for TODO', () => {
    render(
      <TaskCard
        task={mockTask}
        onDelete={mockOnDelete}
        onUpdateStatus={mockOnUpdateStatus}
      />
    );

    const chip = screen.getByText('Por Hacer');
    expect(chip).toBeInTheDocument();
  });

  it('should display correct status for IN_PROGRESS', () => {
    const inProgressTask = { ...mockTask, status: 'IN_PROGRESS' as const };
    render(
      <TaskCard
        task={inProgressTask}
        onDelete={mockOnDelete}
        onUpdateStatus={mockOnUpdateStatus}
      />
    );

    expect(screen.getByText('En Progreso')).toBeInTheDocument();
  });

  it('should display correct status for COMPLETED', () => {
    const completedTask = { ...mockTask, status: 'COMPLETED' as const };
    render(
      <TaskCard
        task={completedTask}
        onDelete={mockOnDelete}
        onUpdateStatus={mockOnUpdateStatus}
      />
    );

    expect(screen.getByText('Completada')).toBeInTheDocument();
  });
});

