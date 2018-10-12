package com.github.dito04.talarlista.speakerlist;

import static io.javalin.apibuilder.ApiBuilder.delete;
import static io.javalin.apibuilder.ApiBuilder.get;
import static io.javalin.apibuilder.ApiBuilder.post;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.dito04.talarlista.Service;
import io.javalin.Context;

public class ViewService implements Service {
  private final SpeakerList speakerList;
  private final SpeakerNameValidator speakerNameValidator;
  private final ObjectMapper objectMapper;

  @Inject
  public ViewService(SpeakerList speakerList, SpeakerNameValidator speakerNameValidator, ObjectMapper objectMapper) {
    this.speakerList = speakerList;
    this.speakerNameValidator = speakerNameValidator;
    this.objectMapper = objectMapper;
  }

  @Override
  public void wire(Inbound inbound) {
    inbound.wireRoute("double/", () -> {
      get(this::getView);
      post(this::updateSpeaker);
      delete(this::resetList);
    });
    inbound.wireRoute("double/first", () -> {
      get(this::getFirstList);
      post(this::addToFirst);
    });
    inbound.wireRoute("double/second", () -> {
      get(this::getSecondList);
      post(this::addToSecond);
    });
  }

  private void getFirstList(Context context) {
    context.json(speakerList.getFirstList());
  }

  private void addToFirst(Context context) throws IOException {
    String name = context.body();
    speakerNameValidator.validate(name);
    Speaker speaker = objectMapper.readValue(name, Speaker.class);
    speakerList.addToFirstList(speaker.getName());
    context.json(speakerList.getFirstList());
  }

  private void getSecondList(Context context) {
    context.json(speakerList.getSecondList());
  }

  private void addToSecond(Context context) throws IOException {
    String name = context.body();
    speakerNameValidator.validate(name);
    Speaker speaker = objectMapper.readValue(name, Speaker.class);
    speakerList.addToSecondList(speaker.getName());
    context.json(speakerList.getSecondList());
  }

  private void getView(Context context) {
    speakerList.getNextSpeaker()
        .map(Speaker::new)
        .ifPresentOrElse(
          context::json,
          () -> context.res.setStatus(HttpServletResponse.SC_MOVED_TEMPORARILY));
  }

  private void updateSpeaker(Context context) throws IOException {
    Speaker postedSpeaker = objectMapper.readValue(context.body(), Speaker.class);
    boolean sameSpeakerAsNext = speakerList.getNextSpeaker()
        .filter(name -> name.equals(postedSpeaker.getName()))
        .isPresent();
    if (sameSpeakerAsNext && postedSpeaker.haveSpoken()) {
      speakerList.removeFistSpeaker();
    }
  }

  private void resetList(Context context) {
    speakerList.reset();
    context.json("Cleared");
  }
}