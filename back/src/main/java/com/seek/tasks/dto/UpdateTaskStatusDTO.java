package com.seek.tasks.dto;

import com.seek.tasks.entity.Task.TaskStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTaskStatusDTO {

    @NotNull(message = "Status is required")
    private TaskStatus status;
}
