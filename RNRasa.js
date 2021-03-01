import React, {useState, useCallback} from 'react';

import {GiftedChat} from 'react-native-gifted-chat';

import {
  uuidv4,
  createNewBotMessage,
  createBotEmptyMessage,
  fetchOptions,
} from './util';

//TODO: reset bot on destroy

const RNRasa = (
  {host, onSendMessFailed, onEmptyResponse, emptyResponseMessage},
  ...giftedChatProp
) => {
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
      try {
        const response = await fetch(`${host}/webhooks/rest/webhook`, {
          ...fetchOptions,
          body: JSON.stringify(rasaMessageObj),
        });
        const messagesJson = await response.json();
        const newRecivieMess = parseMessages(messagesJson);
        if (!newRecivieMess.length) {
          onEmptyResponse && onEmptyResponse();
          if (emptyResponseMessage) {
            const emptyMessageReceive = createBotEmptyMessage(
              emptyResponseMessage,
            );
            setMessages((previousMessages) =>
              GiftedChat.append(previousMessages, [emptyMessageReceive]),
            );
          }
          return;
        }
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newRecivieMess.reverse()),
        );
      } catch (error) {
        // handle when send message failed
        onSendMessFailed(error);
      }
    },
    [
      parseMessages,
      host,
      onSendMessFailed,
      onEmptyResponse,
      emptyResponseMessage,
    ],
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
      {...giftedChatProp}
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
