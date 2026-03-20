# Etapa 1: Construcción (Build)
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
# Copiamos el pom y descargamos dependencias (esto optimiza el cache)
COPY pom.xml .
RUN mvn dependency:go-offline
# Copiamos el código y generamos el .jar
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Ejecución (Runtime)
FROM eclipse-temurin:21-jre
WORKDIR /app
# Copiamos solo el archivo ejecutable desde la etapa de build
COPY --from=build /app/target/AztlanShop-0.0.1-SNAPSHOT.jar app.jar
# Exponemos el puerto de Spring Boot
EXPOSE 8080
# Comando para arrancar la app
ENTRYPOINT ["java", "-jar", "app.jar"]