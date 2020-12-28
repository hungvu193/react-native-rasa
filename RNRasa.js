import React, {useState, useCallback} from 'react';

import {GiftedChat} from 'react-native-gifted-chat';

import {uuidv4, createNewBotMessage} from './util';

//TODO: reset bot on destroy
//TODO: handle when bot response error

const RNRasa = ({host}) => {
  const [messages, setMessages] = useState([]);
  // Parse the array message
  const parseMessages = useCallback((messArr) => {
    return (messArr || []).map((singleMess) => createNewBotMessage(singleMess));
  }, []);

  // Send message to bot
  const sendMessage = useCallback(
    async (text) => {
      const rasaMessageObj = {
        message: text,
        sender: 'user',
      };

      const fetchOptions = {
        method: 'POST',
        body: JSON.stringify(rasaMessageObj),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(
        `${host}/webhooks/rest/webhook`,
        fetchOptions,
      );
      const messagesJson = await response.json();
      const newRecivieMess = parseMessages(messagesJson);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newRecivieMess.reverse()),
      );
    },
    [parseMessages, host],
  );
  // Send message
  const onSend = useCallback(
    (mess = []) => {
      sendMessage(mess[0].text);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, mess),
      );
    },
    [sendMessage],
  );
  // Bot Button click
  const onQuickReply = (props) => {
    const value = props && props[0] && props[0].value;
    const quickMessage = [
      {
        createdAt: new Date(),
        username: 'user',
        _id: uuidv4(),
        user: {_id: 1},
        text: value,
      },
    ];
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, quickMessage.reverse()),
    );
    sendMessage(value);
  };

  return (
    <GiftedChat
      user={{
        _id: 1,
      }}
      onSend={(mess) => onSend(mess)}
      messages={messages}
      onQuickReply={onQuickReply}
    />
  );
};

export default RNRasa;
