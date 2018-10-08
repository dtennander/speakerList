package com.github.dito04.talarlista.speakerlist;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

class SpeakerList {
  private final List<Speaker> firstList = new ArrayList<>();
  private final List<Speaker> secondList = new ArrayList<>();

  Optional<String> getNextSpeaker() {
    return getFirstSpeaker()
        .map(Speaker::getName);
  }

  private Optional<Speaker> getFirstSpeaker() {
    return Stream.concat(firstList.stream(), secondList.stream())
        .filter(Speaker::haveNotSpoken)
        .findFirst();
  }

  void addToFirstList(String body) {
    firstList.add(new Speaker(body));
  }

  void addToSecondList(String body) {
    secondList.add(new Speaker(body));
  }

  List<String> getFirstList() {
    return firstList.stream()
        .map(Speaker::getName)
        .collect(Collectors.toList());
  }

  List<String> getSecondList() {
    return secondList.stream()
        .map(Speaker::getName)
        .collect(Collectors.toList());
  }

  void removeFistSpeaker() {
    getFirstSpeaker().ifPresent(Speaker::setHaveSpoken);
  }
}
