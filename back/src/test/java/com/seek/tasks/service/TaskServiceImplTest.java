package com.seek.tasks.service;

import com.seek.tasks.dto.TaskRequestDTO;
import com.seek.tasks.dto.TaskResponseDTO;
import com.seek.tasks.entity.Task;
import com.seek.tasks.exception.TaskNotFoundException;
import com.seek.tasks.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    private Task task;
    private TaskRequestDTO taskRequestDTO;
    private String userId;

    @BeforeEach
    void setUp() {
        userId = "user123";
        task = Task.builder()
                .id("test-uuid")
                .title("Test Task")
                .description("Test Description")
                .status(Task.TaskStatus.TODO)
                .userId(userId)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        taskRequestDTO = TaskRequestDTO.builder()
                .title("Test Task")
                .description("Test Description")
                .status(Task.TaskStatus.TODO)
                .build();
    }

    @Test
    void getAllTasksForUser_ShouldReturnAllTasks() {
        // Arrange
        List<Task> tasks = Arrays.asList(task);
        when(taskRepository.findByUserId(userId)).thenReturn(tasks);

        // Act
        List<TaskResponseDTO> result = taskService.getAllTasksForUser(userId);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(task.getTitle(), result.get(0).getTitle());
        verify(taskRepository, times(1)).findByUserId(userId);
    }

    @Test
    void getTaskById_WithValidId_ShouldReturnTask() {
        // Arrange
        when(taskRepository.findByIdAndUserId(task.getId(), userId))
                .thenReturn(Optional.of(task));

        // Act
        TaskResponseDTO result = taskService.getTaskById(task.getId(), userId);

        // Assert
        assertNotNull(result);
        assertEquals(task.getId(), result.getId());
        assertEquals(task.getTitle(), result.getTitle());
        verify(taskRepository, times(1)).findByIdAndUserId(task.getId(), userId);
    }

    @Test
    void getTaskById_WithInvalidId_ShouldThrowException() {
        // Arrange
        when(taskRepository.findByIdAndUserId(anyString(), anyString()))
                .thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(TaskNotFoundException.class, () -> 
            taskService.getTaskById("invalid-id", userId));
        verify(taskRepository, times(1)).findByIdAndUserId("invalid-id", userId);
    }

    @Test
    void createTask_ShouldReturnCreatedTask() {
        // Arrange
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        // Act
        TaskResponseDTO result = taskService.createTask(taskRequestDTO, userId);

        // Assert
        assertNotNull(result);
        assertEquals(task.getTitle(), result.getTitle());
        assertEquals(task.getDescription(), result.getDescription());
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void updateTask_WithValidId_ShouldReturnUpdatedTask() {
        // Arrange
        TaskRequestDTO updateRequest = TaskRequestDTO.builder()
                .title("Updated Title")
                .description("Updated Description")
                .status(Task.TaskStatus.COMPLETED)
                .build();

        when(taskRepository.findByIdAndUserId(task.getId(), userId))
                .thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        // Act
        TaskResponseDTO result = taskService.updateTask(task.getId(), updateRequest, userId);

        // Assert
        assertNotNull(result);
        verify(taskRepository, times(1)).findByIdAndUserId(task.getId(), userId);
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void markTaskAsCompleted_ShouldSetCompletedToTrue() {
        // Arrange
        when(taskRepository.findByIdAndUserId(task.getId(), userId))
                .thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        // Act
        TaskResponseDTO result = taskService.markTaskAsCompleted(task.getId(), userId);

        // Assert
        assertNotNull(result);
        verify(taskRepository, times(1)).findByIdAndUserId(task.getId(), userId);
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void deleteTask_WithValidId_ShouldDeleteTask() {
        // Arrange
        when(taskRepository.existsByIdAndUserId(task.getId(), userId)).thenReturn(true);
        doNothing().when(taskRepository).deleteByIdAndUserId(task.getId(), userId);

        // Act
        taskService.deleteTask(task.getId(), userId);

        // Assert
        verify(taskRepository, times(1)).existsByIdAndUserId(task.getId(), userId);
        verify(taskRepository, times(1)).deleteByIdAndUserId(task.getId(), userId);
    }

    @Test
    void deleteTask_WithInvalidId_ShouldThrowException() {
        // Arrange
        when(taskRepository.existsByIdAndUserId(anyString(), anyString())).thenReturn(false);

        // Act & Assert
        assertThrows(TaskNotFoundException.class, () -> 
            taskService.deleteTask("invalid-id", userId));
        verify(taskRepository, times(1)).existsByIdAndUserId("invalid-id", userId);
        verify(taskRepository, never()).deleteByIdAndUserId(anyString(), anyString());
    }
}
