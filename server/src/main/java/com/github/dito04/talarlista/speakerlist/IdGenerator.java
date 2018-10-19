package com.github.dito04.talarlista.speakerlist;

import java.time.Instant;
import java.util.Base64;

/**
 * Generates IDs
 */
class IdGenerator {
  private static final long TIME_OFFSET = 1_500_000_000L;
  private Base64.Encoder encoder = Base64.getEncoder();

  /**
   * Generates a unique id.
   * @return the generated id.
   */
  String generateId() {
    Instant now = Instant.now();
    long seed = now.getEpochSecond() + now.getNano() - TIME_OFFSET;
    return new String(encoder.encode(Long.toString(seed).getBytes()));
  }
}
