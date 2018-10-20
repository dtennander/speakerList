package com.github.dito04.talarlista.speakerlist;

import static io.javalin.apibuilder.ApiBuilder.delete;
import static io.javalin.apibuilder.ApiBuilder.get;
import static io.javalin.apibuilder.ApiBuilder.post;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.dito04.talarlista.Service;
import com.github.dito04.talarlista.speakerlist.json.JsonSpeaker;
import com.github.dito04.talarlista.speakerlist.json.NewListRsp;
import io.javalin.Context;
import org.jetbrains.annotations.NotNull;

public class ViewService implements Service {
  private final SpeakerListCache speakerListCache;
  private final ObjectMapper objectMapper;

  @Inject
  public ViewService(SpeakerListCache speakerListCache, ObjectMapper objectMapper) {
    this.speakerListCache = speakerListCache;
    this.objectMapper = objectMapper;
  }

  @Override
  public void wire(Inbound inbound) {
    inbound.wireRoute("double/", () ->
        post(this::createNewList));
    inbound.wireRoute("double/:id", () -> {
      get(this::getView);
      post(this::updateSpeaker);
      delete(this::removeList);
    });
    inbound.wireRoute("double/:id/first", () -> {
      get(this::getFirstList);
      post(this::addToFirst);
      delete(ctx -> this.clearList("first", ctx));
    });
    inbound.wireRoute("double/:id/second", () -> {
      get(this::getSecondList);
      post(this::addToSecond);
      delete(ctx -> this.clearList("second", ctx));
    });
  }

  private void createNewList(Context context) {
    String id = speakerListCache.createList();
    NewListRsp rsp = new NewListRsp(id);
    context.json(rsp);
  }

  private void getView(Context context) {
    getSpeakerList(context)
        .ifPresentOrElse(
            l -> {
                var speaker = l.getNextSpeaker()
                    .map(ViewService::getJsonView)
                    .orElseGet(() -> new JsonSpeaker("", false));
                context.json(speaker);
            },
            () ->
                context.res.setStatus(HttpServletResponse.SC_NOT_FOUND));
  }

  @NotNull
  private static JsonSpeaker getJsonView(Speaker speaker) {
    return new JsonSpeaker(speaker.getName(), !speaker.haveNotSpoken());
  }

  private Optional<SpeakerList> getSpeakerList(Context context) {
    return speakerListCache.getList(getId(context));
  }

  @NotNull
  private static List<JsonSpeaker> getJsonView(List<Speaker> firstList) {
    return firstList
        .stream()
        .map(ViewService::getJsonView)
        .collect(Collectors.toList());
  }

  @NotNull
  private static String getId(Context context) {
    return context.pathParam("id");
  }

  private void updateSpeaker(Context context) throws IOException {
    JsonSpeaker postedSpeaker = objectMapper.readValue(context.body(), JsonSpeaker.class);
    Optional<SpeakerList> list = getSpeakerList(context);
    boolean sameSpeakerAsNext = list
        .flatMap(SpeakerList::getNextSpeaker)
        .filter(speaker -> speaker.getName().equals(postedSpeaker.getName()))
        .isPresent();
    if (sameSpeakerAsNext && postedSpeaker.haveSpoken()) {
      list.ifPresent(SpeakerList::removeFistSpeaker);
    }
  }

  private void removeList(Context context) {
    speakerListCache.removeList(getId(context));
    context.json("Cleared");
  }

  private void clearList(String listId, Context ctx) throws IOException {
    Optional<SpeakerList> optSpeakerList = getSpeakerList(ctx);
    if (!optSpeakerList.isPresent()) {
      notFoundError(ctx);
      return;
    }
    if (listId.equals("first")) {
      optSpeakerList.get().resetFirst();
    } else {
      optSpeakerList.get().resetSecond();
    }
    ctx.json("Cleared");
  }

  private void notFoundError(Context ctx) throws IOException {
    ctx.res.sendError(HttpServletResponse.SC_NOT_FOUND);
  }

  private void getFirstList(Context context) throws IOException {
    Optional<SpeakerList> list = getSpeakerList(context);
    if (list.isPresent()) {
      context.json(getJsonView(list.get().getFirstList()));
    } else {
      notFoundError(context);
    }
  }

  private void addToFirst(Context context) throws IOException {
    JsonSpeaker speaker = objectMapper.readValue(context.body(), JsonSpeaker.class);
    Optional<SpeakerList> list = getSpeakerList(context);
    if (!list.isPresent()) {
      notFoundError(context);
      return;
    }
    list.get().addToFirstList(speaker.getName());
    context.json(getJsonView(list.get().getFirstList()));
  }

  private void getSecondList(Context context) throws IOException {
    Optional<SpeakerList> list = getSpeakerList(context);
    if (!list.isPresent()) {
      notFoundError(context);
      return;
    }
    context.json(getJsonView(list.get().getSecondList()));
  }

  private void addToSecond(Context context) throws IOException {
    JsonSpeaker speaker = objectMapper.readValue(context.body(), JsonSpeaker.class);
    Optional<SpeakerList> list = getSpeakerList(context);
    if (!list.isPresent()) {
      notFoundError(context);
      return;
    }
    list.get().addToSecondList(speaker.getName());
    context.json(getJsonView(list.get().getSecondList()));
  }
}
