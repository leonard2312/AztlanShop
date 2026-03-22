package com.AztlanShop.configuration;

import org.springframework.graphql.server.WebGraphQlInterceptor;
import org.springframework.graphql.server.WebGraphQlRequest;
import org.springframework.graphql.server.WebGraphQlResponse;
import org.springframework.http.ResponseCookie;
import reactor.core.publisher.Mono;
import java.util.Map;

public class CookieInterceptor implements WebGraphQlInterceptor {

    @Override
    public Mono<WebGraphQlResponse> intercept(WebGraphQlRequest request, Chain chain) {
        return chain.next(request).doOnNext(response -> {
            // Buscamos si en los datos de la respuesta está el resultado del login
            Map<String, Object> data = response.getData();
            if (data != null && data.containsKey("login")) {
                Map<String, String> loginResult = (Map<String, String>) data.get("login");

                // Si el login fue exitoso (suponiendo que mandas un token o username)
                if (loginResult.containsKey("token")) {
                    String token = loginResult.get("token");

                    ResponseCookie cookie = ResponseCookie.from("AuthID", token)
                            .httpOnly(true)
                            .secure(false) // Ponlo en true si usas HTTPS
                            .path("/")
                            .maxAge(3600)
                            .sameSite("Lax")
                            .build();

                    response.getExecutionInput().getGraphQLContext().put("cookie", cookie.toString());
                }
            }
        });
    }
}