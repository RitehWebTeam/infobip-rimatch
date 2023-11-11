FROM eclipse-temurin:17-jdk-focal

RUN apt-get update && apt-get -y upgrade
RUN apt-get install -y inotify-tools

RUN mkdir -p /app
WORKDIR /app
COPY .mvn ./.mvn
COPY mvnw pom.xml ./

RUN chmod u+x ./mvnw
RUN ./mvnw dependency:go-offline

COPY docker-entrypoint.sh .
COPY src ./src

EXPOSE 8080
EXPOSE 5005

CMD ["sh", "./docker-entrypoint.sh"]