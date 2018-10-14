package com.github.dito04.talarlista.speakerlist;

import java.util.UUID;

/**
 * Generates IDs
 */
class IdGenerator {

  /**
   * Generates a unique id.
   * @return the generated id.
   */
  String generateId() {
    return UUID.randomUUID().toString();
  }
}
