package com.seek.tasks.exception;

public class TaskNotFoundException extends RuntimeException {

    public TaskNotFoundException(String message) {
        super(message);
    }

    public TaskNotFoundException(String id, String userId) {
        super(String.format("Task with id '%s' not found for user %s", id, userId));
    }
}
