/**
 * Random id for each message
 */
export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
/**
 * Return message after format
 * @param {Object} botMessageObj
 */
export function createNewBotMessage(botMessageObj) {
  return {
    createdAt: new Date(),
    username: 'bot',
    _id: uuidv4(),
    user: {_id: 'bot'},
    text: botMessageObj.text,
    buttons: botMessageObj && botMessageObj.buttons,
    image: botMessageObj && botMessageObj.image,
    quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: false,
      values: (botMessageObj.buttons || []).map((button) => ({
        title: button.title,
        value: button.payload,
      })),
    },
  };
}
