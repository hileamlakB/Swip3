browser.runtime.onMessage.addListener(update);

function update(message) {
    console.log(message);
 browser.storage.local.set(message);
}
