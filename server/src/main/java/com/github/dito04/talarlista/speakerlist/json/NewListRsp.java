package com.github.dito04.talarlista.speakerlist.json;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonProperty;

public class NewListRsp {

  private final String id;

  @JsonCreator
  public NewListRsp(@JsonProperty("id") String id) {
    this.id = id;
  }

  @JsonGetter("id")
  String getId() {
    return id;
  }
}
