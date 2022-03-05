# Backend Requirements/ Information

1. Main dependencies needed:

## Currently Using

- Maven
- spring-web: build web, including RESTful, applications using Spring MVC. Uses Apache Tomcat as the default embedded container
- spring-boot-devtoolslombok: java annotation library which helps to reduce boilerplate code
- spring-boot-starter-hateoas: eases the creation of RESTful APIs that follow the HATEOAS principle when working with Spring/ Spring MVC
- aws-java-sdk: makes it easy to call AWS services using idiomatic Java APIs

## Possible Future Usage

- spring-boot-starter-test
- mysql-connector-java: driver for mysql
- spring-data-jpa: persist data in SQL stores with Java Persistence API using Spring Data and Hibernate


2. How to install them

- install JDK and Maven (https://maven.apache.org/install.html)
- already included dependencies in pom.xml

3. What else to install / commands to run them

- cd backend, mvn spring-boot:run

4. Any other things that might be usefull like port number etc

- port: 8080
