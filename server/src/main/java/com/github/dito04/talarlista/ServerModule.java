package com.github.dito04.talarlista;

import com.github.dito04.talarlista.config.ConfigurationModule;
import com.github.dito04.talarlista.speakerlist.ViewService;
import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.google.inject.multibindings.Multibinder;
import io.javalin.Javalin;

public class ServerModule extends AbstractModule {

  @Override
  protected void configure() {
    install(new ConfigurationModule());

    Multibinder<Service> services = Multibinder.newSetBinder(binder(), Service.class);
    services.addBinding().to(ViewService.class);
  }

  @Provides
  Javalin provideJavalin() {
    return Javalin.create();
  }

}
