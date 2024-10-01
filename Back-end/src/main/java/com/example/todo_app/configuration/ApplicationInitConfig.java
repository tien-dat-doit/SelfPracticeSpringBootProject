package com.example.todo_app.configuration;

import com.example.todo_app.constant.PredefinedPermission;
import com.example.todo_app.constant.PredefinedRole;
import com.example.todo_app.entity.Permission;
import com.example.todo_app.entity.Role;
import com.example.todo_app.entity.User;
import com.example.todo_app.repository.PermissionRepository;
import com.example.todo_app.repository.RoleRepository;
import com.example.todo_app.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;

    @NonFinal
    static final String ADMIN_USER_NAME = "admin";

    @NonFinal
    static final String ADMIN_PASSWORD = "admin";

    @NonFinal
    static final String USER_NAME = "user";

    @NonFinal
    static final String USER_PASSWORD = "user";

    @Bean
    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver")
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository, PermissionRepository permissionRepository) {
        log.info("Initializing application.....");
        return args -> {
            if (userRepository.findByUsername(ADMIN_USER_NAME).isEmpty()) {
                Permission createNote = permissionRepository.save(Permission.builder()
                                .name(PredefinedPermission.CREATE_NOTE)
                                .description("Tạo các ghi chú")
                        .build());
                Permission updateNote = permissionRepository.save(Permission.builder()
                        .name(PredefinedPermission.UPDATE_NOTE)
                        .description("Cập nhật các ghi chú của mình đã tạo")
                        .build());
                Permission deleteNote = permissionRepository.save(Permission.builder()
                        .name(PredefinedPermission.DELETE_NOTE)
                        .description("Xóa các ghi chú của mình đã tạo")
                        .build());

                var permissions = new HashSet<Permission>();
                permissions.add(createNote);
                permissions.add(updateNote);
                permissions.add(deleteNote);
                Role userRole = roleRepository.save(Role.builder()
                        .name(PredefinedRole.USER_ROLE)
                        .description("Người dùng")
                        .permissions(permissions)
                        .build());

                Role adminRole = roleRepository.save(Role.builder()
                        .name(PredefinedRole.ADMIN_ROLE)
                        .description("Quản trị viên hệ thống")
                        .permissions(permissions)
                        .build());

                var adminRoles = new HashSet<Role>();
                adminRoles.add(adminRole);

                var userRoles = new HashSet<Role>();
                userRoles.add(userRole);

                User admin = User.builder()
                        .username(ADMIN_USER_NAME)
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .roles(adminRoles)
                        .firstName("Đạt")
                        .lastName("Tiến")
                        .dob(LocalDate.of(2001, 1, 1))
                        .build();

                User user = User.builder()
                        .username(USER_NAME)
                        .password(passwordEncoder.encode(USER_PASSWORD))
                        .roles(userRoles)
                        .firstName("Đạt")
                        .lastName("Tiến")
                        .dob(LocalDate.of(2001, 1, 1))
                        .build();
                userRepository.save(user);
                userRepository.save(admin);
                log.warn("admin user has been created with default password: admin, please change it");
            }
            log.info("Application initialization completed .....");
        };
    }
}
