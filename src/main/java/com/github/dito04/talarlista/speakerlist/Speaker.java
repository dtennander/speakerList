package com.github.dito04.talarlista.speakerlist;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonProperty;

class Speaker {

  private final String name;
  private boolean haveSpoken;

  @JsonCreator
  Speaker(@JsonProperty("name") String name) {
    this.name = name;
    this.haveSpoken = false;
  }

  void setHaveSpoken() {
    this.haveSpoken = true;
  }
  boolean haveNotSpoken() {
    return !this.haveSpoken;
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
