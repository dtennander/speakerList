package com.github.dito04.talarlista.speakerlist;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.not;
import static org.junit.Assert.assertThat;

import org.junit.Before;
import org.junit.Test;

public class IdGeneratorTest {

  private IdGenerator target;

  @Before
  public void setUp() {
    target = new IdGenerator();
  }

  @Test
  public void generateId() {
    // Given

    // WHen
    String id = target.generateId();

    // Then
    assertThat(id, not(equalTo(target.generateId())));

  }
}