FROM tomcat:8-jdk8-openjdk

ENV SERVER_PORT=8080
ENV REGISTRY_HOST=eureka-registry
ENV MONGO_HOST=mongo
ENV MONGO_PORT=27017

ADD ./target/user-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/ROOT.war