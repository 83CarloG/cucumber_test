"use strict";

const { Given, When, Then } = require('@cucumber/cucumber');
const Person = require('../../src/shouty');
const { assertThat, is } = require('hamjest');

Given('Lucy is located {int} metres from Sean', function (distance) {
    this.lucy = Person('Lucy');
    this.sean = Person('Sean');
    this.lucy.moveTo(distance);
    this.sean.moveTo(0);  // Sean stays at position 0
});

When('Sean shouts {string}', function (message) {
    this.sean.shout(message);
    this.message = message;
});

Then('Lucy hears Sean\'s message', function () {
    const heardMessages = this.lucy.messageHeard();
    assertThat(heardMessages, is([this.message]));
});

Then('Lucy hears nothing', function () {
    const heardMessages = this.lucy.messageHeard();
    assertThat(heardMessages, is([]));
});