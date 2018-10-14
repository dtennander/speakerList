package com.github.dito04.talarlista.speakerlist;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Provider;

class SpeakerListCache {
  private final Map<String, SpeakerList> lists = new HashMap<>();
  private final Provider<SpeakerList> listProvider;
  private final IdGenerator idGenerator;

  @Inject
  SpeakerListCache(Provider<SpeakerList> listProvider, IdGenerator idGenerator) {
    this.listProvider = listProvider;
    this.idGenerator = idGenerator;
  }

  Optional<SpeakerList> getList(String id) {
    return Optional.ofNullable(lists.get(id));
  }

  /**
   * Generates a new {@link SpeakerList} and stores it under a new id.
   * @return the new id.
   */
  String createList() {
    SpeakerList list = listProvider.get();
    String id = idGenerator.generateId();
    lists.put(id, list);
    return id;
  }

  void removeList(String id) {
    lists.remove(id);
  }
}
