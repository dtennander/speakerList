package com.github.dito04.talarlista.speakerlist;

/**
 * Data class for a speaker.
 */
class Speaker {
  private final String name;
  private boolean haveSpoken;

  Speaker(String name) {
    this.name = name;
    this.haveSpoken = false;
  }

  boolean haveNotSpoken() {
    return !this.haveSpoken;
  }

  void setHaveSpoken() {
    this.haveSpoken = true;
  }

  String getName() {
    return this.name;
  }
}
