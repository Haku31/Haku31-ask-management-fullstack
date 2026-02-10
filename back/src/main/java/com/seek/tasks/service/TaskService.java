package com.seek.tasks.service;

import com.seek.tasks.dto.TaskRequestDTO;
import com.seek.tasks.dto.TaskResponseDTO;
import com.seek.tasks.entity.Task.TaskStatus;

import java.util.List;

public interface TaskService {

    List<TaskResponseDTO> getAllTasksForUser(String userId);

    TaskResponseDTO getTaskById(String taskId, String userId);

    TaskResponseDTO createTask(TaskRequestDTO taskRequest, String userId);

    TaskResponseDTO updateTask(String taskId, TaskRequestDTO taskRequest, String userId);

    TaskResponseDTO updateTaskStatus(String taskId, TaskStatus status, String userId);

    TaskResponseDTO markTaskAsCompleted(String taskId, String userId);

    void deleteTask(String taskId, String userId);
}
