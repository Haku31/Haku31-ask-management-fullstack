import { api } from '@/shared/utils/api';
import { Task, CreateTaskDto, UpdateTaskStatusDto } from './types/task.types';

class TasksService {
  async getTasks(): Promise<Task[]> {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  }

  async createTask(taskData: CreateTaskDto): Promise<Task> {
    const response = await api.post<Task>('/tasks', taskData);
    return response.data;
  }

  async updateTaskStatus(taskId: string, statusData: UpdateTaskStatusDto): Promise<Task> {
    const response = await api.put<Task>(`/tasks/${taskId}/status`, statusData);
    return response.data;
  }

  async deleteTask(taskId: string): Promise<void> {
    await api.delete(`/tasks/${taskId}`);
  }
}

export const tasksService = new TasksService();

