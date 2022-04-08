# Dependencies
#### Main Language: 
Java 11
#### Frameworks: 
- Maven
- spring-web: build web, including RESTful, applications using Spring MVC. Uses Apache Tomcat as the default embedded container
- spring-boot-devtoolslombok: java annotation library which helps to reduce boilerplate code
- spring-boot-starter-hateoas: eases the creation of RESTful APIs that follow the HATEOAS principle when working with Spring/ Spring MVC
- aws-java-sdk: makes it easy to call AWS services using idiomatic Java APIs

###### Possible Future Usage
- spring-boot-starter-test
- mysql-connector-java: driver for mysql
- spring-data-jpa: persist data in SQL stores with Java Persistence API using Spring Data and Hibernate

#### Packages:
All dependencies provided in pom.xml

# Initialization
*Assumes that JDK 11 and Maven is available*
- Else: install JDK and Maven (https://maven.apache.org/install.html)

1. Create a copy of `.env.example` in `/backend` and rename it to `.env`
- Include ACCESS_KEY and SECRET KEY of AWS IAM User with write access to AWS S3 in `.env` 
2. Set `/backend` as working directory
    ```
    cd backend
    ```
3. Run Maven to compile dependencies and run application
    ```
    mvn spring-boot:run
    ```

# Interaction
Application runs on Port 8080 by default (ensure that there are no other services running on this port)
3 endpoints are currently available

* `/data`
    
    Placeholder homepage, returns welcome message
    
* `/data/analyze`
    
    Takes in JSON string containing dataset and requests datatype processing from `/process` endpoint provided by Python API.
    - Able to take in multiple JSON datasets combined into a single JSON request
    - Returns datatype breakdown for each of the request JSON dataset (compiled if more than one JSON dataset)
    
* `/data/report`

    Takes in JSON body string containing data formatting and requests excel report from `/report` endpoint provided by Python API
    - Assimilates required datasets from AWS S3
    - Saves a copy of the generated Excel report in AWS S3
