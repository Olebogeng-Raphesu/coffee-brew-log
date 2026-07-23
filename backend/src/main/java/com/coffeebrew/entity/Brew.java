package com.coffeebrew.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
public class Brew {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Bean name is required")
    private String beanName;

    @NotBlank(message = "Brew method is required")
    private String brewMethod; // e.g., "V60", "French Press", "Espresso"

    @NotBlank(message = "Grind size is required")
    private String grindSize;

    @NotNull(message = "Water temperature is required")
    private Integer waterTemp; // in Celsius

    @NotBlank(message = "Brew time is required")
    private String brewTime; // e.g., "3:30"

    private String notes;

    @CreationTimestamp
    private LocalDateTime createdAt;
}