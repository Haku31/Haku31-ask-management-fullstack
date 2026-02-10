package com.seek.tasks.service;

import com.seek.tasks.dto.AuthResponseDTO;
import com.seek.tasks.dto.LoginRequestDTO;
import com.seek.tasks.dto.RegisterRequestDTO;

public interface AuthService {

    AuthResponseDTO register(RegisterRequestDTO registerRequest);

    AuthResponseDTO login(LoginRequestDTO loginRequest);
}
