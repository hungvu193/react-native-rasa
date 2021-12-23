import React, { useState, useCallback, FC } from 'react';
import {
  GiftedChat,
  GiftedChatProps,
  Actions,
  Avatar,
  Bubble,
  SystemMessage,
  MessageImage,
  MessageText,
  Composer,
  Day,
  InputToolbar,
  LoadEarlier,
  Message,
  MessageContainer,
  Send,
  Time,
  GiftedAvatar,
  utils,
  Reply,
  IMessage,
  User
} from 'react-native-gifted-chat';
import { IRasaMessage, IRasaResponse } from './types';
import {
  createNewBotMessage,
  createBotEmptyMessage,
  fetchOptions,
  createQuickUserReply,
  isValidNotEmptyArray
} from './utils';

//TODO: reset bot on destroy

export interface IRasaChat extends Omit<GiftedChatProps, 'user' | 'onSend' | 'messages' | 'onQuickReply'> {
  host: string;
  onSendMessFailed?: (error) => void
  onEmptyResponse?: () => void
  emptyResponseMessage?: string;
  userId?: string | number;
  userAvatar?: string;
  userName?: string;
  botName?: string;
  botAvatar?: string;
}

const RasaChat: FC<IRasaChat> = (props: IRasaChat) => {
  const {
    host,
    onSendMessFailed,
    onEmptyResponse,
    emptyResponseMessage,
    userId = 'UserId1',
    userName = '',
    userAvatar = '',
    botName = 'RasaChat',
    botAvatar = '',
    ...giftedChatProp
  } = props;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [lastRasaResponse, setLastRasaResponse] = useState<IRasaResponse>({});
  const userData: User = {
    _id: userId,
    name: userName,
    avatar: userAvatar,
  }
  const botData: User = {
    _id: 'bot_Id_1',
    name: botName,
    avatar: botAvatar,
  }

  // Parse the array message
  const parseMessages = useCallback((messArr: IRasaResponse[]): IMessage[] => {
    return (messArr || []).map((singleMess) =>
      createNewBotMessage(singleMess, botData),
    );
  }, [botData]);

  // Send message to rasa rest webhook
  const sendMessage = useCallback(async (text: string): Promise<void> => {
    const rasaMessageObj: IRasaMessage = {
      message: text,
      sender: `${userId}`,
    };
    try {
      const response = await fetch(`${host}/webhooks/rest/webhook`, {
        ...fetchOptions,
        body: JSON.stringify(rasaMessageObj),
      });
      const messagesJson = await response.json();
      if(messagesJson) setLastRasaResponse(messagesJson[0]);      
      const newRecivieMess = parseMessages(messagesJson);
      if (!isValidNotEmptyArray(newRecivieMess)) {
        onEmptyResponse && onEmptyResponse();
        if (emptyResponseMessage) {
          const emptyMessageReceive = createBotEmptyMessage(emptyResponseMessage, botData);
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
      onSendMessFailed && onSendMessFailed(error);
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

  // Hook when send button is pressed
  const onSend = useCallback((messages: IMessage[] = []): void => {
    const { text: userText2Rasa = '' } = messages[0] ?? {};
    sendMessage(userText2Rasa);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, [sendMessage]);

  // Hook when Chat Message with Quick Reply options are pressed
  const onQuickReply = useCallback((replies: Reply[]): void => {
    let quickMessage: IMessage[] = []
    let userText2Rasa: string = ''
    // Case when reply is a radio -> just one option
    if (replies.length === 1) {
      const { value = '', title = '' } = replies[0] ?? {};
      quickMessage = [createQuickUserReply(title, userData)]
      userText2Rasa = value;
    }
    // Case when reply is a checkbox -> Multiple options
    else if (replies.length > 1) {
      quickMessage = [...replies.map((reply) => createQuickUserReply(reply.title, userData))]
      const checklistOptions = replies.map(reply => reply.value);
      const { payload = '/custom_intent', slot = 'custom_slot' } = lastRasaResponse?.attachment?.payload ?? {};
      const newPayload = JSON.stringify({[slot]: checklistOptions})
      userText2Rasa = `${payload}${newPayload}`;
    }
    sendMessage(userText2Rasa);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, quickMessage.reverse()),
    );
  }, [userAvatar, sendMessage]);

  return (
    <GiftedChat
      user={userData}
      onSend={(mess) => onSend(mess)}
      messages={messages}
      onQuickReply={onQuickReply}
      {...giftedChatProp}
    />
  );
};

export default RasaChat;
export { Actions, Avatar, Bubble, SystemMessage, MessageImage, MessageText, Composer, Day, InputToolbar, LoadEarlier, Message, MessageContainer, Send, Time, GiftedAvatar, utils };