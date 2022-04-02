function update(message) {
    browser.runtime.sendMessage(message);
  }
  
exportFunction(update, window, {defineAs:'update'});