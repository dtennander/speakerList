package com.github.dito04.talarlista.hello;

import static io.javalin.apibuilder.ApiBuilder.get;

import com.github.dito04.talarlista.Service;
import io.javalin.Context;

public class HelloWorldService implements Service {
  @Override
  public void wire(Inbound inbound) {
    inbound.wireRoute("/api/hello", () -> get(this::hello));
  }

  private void hello(Context context) {
    context.result("Hello!");
  }
}
