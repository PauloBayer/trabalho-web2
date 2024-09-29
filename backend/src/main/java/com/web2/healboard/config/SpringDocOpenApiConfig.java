package com.web2.healboard.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringDocOpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components().addSecuritySchemes("security", securityScheme()))
                .info(
                        new Info()
                                .title("HealBoard")
                                .description("TADS 2024/2 - Desenvolvimento Web 2")
                                .version("v1")
                                .license(new License().name("Apache").url("https://www.apache.org/licenses/LICENSE-2.0"))
                );
    }

    private SecurityScheme securityScheme() {
        return new SecurityScheme()
                .description("Enter a valid bearer token for obligation")
                .type(SecurityScheme.Type.HTTP)
                .in(SecurityScheme.In.HEADER)
                .scheme("bearer")
                .bearerFormat("JWT")
                .name("security");
    }
}
