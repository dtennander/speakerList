package com.github.dito04.talarlista.speakerlist.json;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonProperty;

public class JsonSpeaker {

  private final String name;
  private boolean haveSpoken;

  @JsonCreator
  public JsonSpeaker(
      @JsonProperty("name") String name,
      @JsonProperty("have_spoken") boolean haveSpoken) {
    this.name = name;
    this.haveSpoken = haveSpoken;
  }

  @JsonGetter("have_spoken")
  public boolean haveSpoken() {
    return haveSpoken;
  }

  @JsonGetter("name")
  public String getName() {
    return this.name;
  }
}
