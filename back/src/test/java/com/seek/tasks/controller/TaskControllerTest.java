package com.seek.tasks.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seek.tasks.dto.TaskRequestDTO;
import com.seek.tasks.dto.TaskResponseDTO;
import com.seek.tasks.entity.Task;
import com.seek.tasks.entity.User;
import com.seek.tasks.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
@AutoConfigureMockMvc(addFilters = false)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private TaskService taskService;

    private TaskResponseDTO taskResponse;
    private TaskRequestDTO taskRequest;
    private User mockUser;

    @BeforeEach
    void setUp() {
        mockUser = User.builder()
                .id("user123")
                .username("testuser")
                .email("test@example.com")
                .password("password")
                .build();

        taskResponse = TaskResponseDTO.builder()
                .id("test-uuid")
                .title("Test Task")
                .description("Test Description")
                .status(Task.TaskStatus.TODO)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        taskRequest = TaskRequestDTO.builder()
                .title("Test Task")
                .description("Test Description")
                .status(Task.TaskStatus.TODO)
                .build();
    }

    @Test
    @WithMockUser
    void getAllTasks_ShouldReturnTaskList() throws Exception {
        // Arrange
        List<TaskResponseDTO> tasks = Arrays.asList(taskResponse);
        when(taskService.getAllTasksForUser(anyString())).thenReturn(tasks);

        // Act & Assert
        mockMvc.perform(get("/api/tasks")
                        .with(user(mockUser))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(taskResponse.getId()))
                .andExpect(jsonPath("$[0].title").value(taskResponse.getTitle()));

        verify(taskService, times(1)).getAllTasksForUser(anyString());
    }

    @Test
    @WithMockUser
    void getTaskById_ShouldReturnTask() throws Exception {
        // Arrange
        when(taskService.getTaskById(anyString(), anyString())).thenReturn(taskResponse);

        // Act & Assert
        mockMvc.perform(get("/api/tasks/{id}", "test-uuid")
                        .with(user(mockUser))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(taskResponse.getId()))
                .andExpect(jsonPath("$.title").value(taskResponse.getTitle()));

        verify(taskService, times(1)).getTaskById(anyString(), anyString());
    }

    @Test
    @WithMockUser
    void createTask_ShouldReturnCreatedTask() throws Exception {
        // Arrange
        when(taskService.createTask(any(TaskRequestDTO.class), anyString())).thenReturn(taskResponse);

        // Act & Assert
        mockMvc.perform(post("/api/tasks")
                        .with(user(mockUser))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(taskRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value(taskResponse.getTitle()));

        verify(taskService, times(1)).createTask(any(TaskRequestDTO.class), anyString());
    }

    @Test
    @WithMockUser
    void updateTask_ShouldReturnUpdatedTask() throws Exception {
        // Arrange
        when(taskService.updateTask(anyString(), any(TaskRequestDTO.class), anyString()))
                .thenReturn(taskResponse);

        // Act & Assert
        mockMvc.perform(put("/api/tasks/{id}", "test-uuid")
                        .with(user(mockUser))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(taskRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value(taskResponse.getTitle()));

        verify(taskService, times(1)).updateTask(anyString(), any(TaskRequestDTO.class), anyString());
    }

    @Test
    @WithMockUser
    void deleteTask_ShouldReturnNoContent() throws Exception {
        // Arrange
        doNothing().when(taskService).deleteTask(anyString(), anyString());

        // Act & Assert
        mockMvc.perform(delete("/api/tasks/{id}", "test-uuid")
                        .with(user(mockUser))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        verify(taskService, times(1)).deleteTask(anyString(), anyString());
    }
}
