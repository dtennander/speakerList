package com.github.dito04.talarlista;

import java.util.Set;

import javax.inject.Inject;

import com.github.dito04.talarlista.config.Port;
import com.github.dito04.talarlista.config.StaticFileLocation;
import com.google.inject.Guice;
import io.javalin.Javalin;
import io.javalin.apibuilder.ApiBuilder;
import io.javalin.apibuilder.EndpointGroup;

public class Server {

  private final Javalin javalin;
  private final int port;
  private final Set<Service> services;
  private final String staticFilesLocation;

  @Inject
  public Server(
      Javalin javalin,
      @Port int port,
      Set<Service> services,
      @StaticFileLocation String staticFilesLocation) {
    this.javalin = javalin;
    this.port = port;
    this.services = services;
    this.staticFilesLocation = staticFilesLocation;
  }

  private void start() {
    // Api calls
    services.forEach(s -> s.wire(this::wireRoute));
    // Static resources
    javalin.get("/assets/*", context ->
        context.result(getClass().getResourceAsStream(staticFilesLocation + context.path())));
    javalin.get("/*", context -> {
      context.result(getClass().getResourceAsStream(staticFilesLocation + "/index.html"));
      context.res.setContentType("text/html");
    });
    // Start server
    javalin.start(port);
  }

  private void wireRoute(String route, EndpointGroup endpointGroup) {
    javalin.routes(() -> {
      String trimmed = route.replaceAll("^/", "");
      ApiBuilder.path("/api/" + trimmed, endpointGroup);
    });
  }

  public static void main(String[] args) {
    Server server = Guice.createInjector(new ServerModule()).getInstance(Server.class);
    server.start();
  }

}
