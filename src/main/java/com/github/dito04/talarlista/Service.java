package com.github.dito04.talarlista;

import io.javalin.apibuilder.EndpointGroup;

public interface Service {
  void wire(Inbound inbound);

  interface Inbound {
    void wireRoute(String route, EndpointGroup endpointGroup);
  }
}
