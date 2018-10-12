package com.github.dito04.talarlista.speakerlist;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonProperty;

class JsonSpeaker {

  private final String name;
  private boolean haveSpoken;

  @JsonCreator
  JsonSpeaker(
      @JsonProperty("name") String name,
      @JsonProperty("have_spoken") boolean haveSpoken) {
    this.name = name;
    this.haveSpoken = haveSpoken;
  }

  @JsonGetter("have_spoken")
  boolean haveSpoken() {
    return haveSpoken;
  }

  @JsonGetter("name")
  String getName() {
    return this.name;
  }
}
