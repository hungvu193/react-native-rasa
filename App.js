/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback} from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';

import {GiftedChat} from 'react-native-gifted-chat';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {uuidv4} from './util';

// your host
const HOST = 'http://localhost:5005';

//TODO: reset bot on destroy
//TODO: handle when bot response error

const App = () => {
  const [messages, setMessages] = useState([]);
  function createNewBotMessage(botMessageObj) {
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

  const parseMessages = useCallback((messArr) => {
    return (messArr || []).map((singleMess) => createNewBotMessage(singleMess));
  }, []);

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
        `${HOST}/webhooks/rest/webhook`,
        fetchOptions,
      );
      const messagesJson = await response.json();
      const newRecivieMess = parseMessages(messagesJson);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newRecivieMess.reverse()),
      );
    },
    [parseMessages],
  );

  const onSend = useCallback(
    (mess = []) => {
      sendMessage(mess[0].text);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, mess),
      );
    },
    [sendMessage],
  );

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
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <GiftedChat
          user={{
            _id: 1,
          }}
          onSend={(mess) => onSend(mess)}
          messages={messages}
          onQuickReply={onQuickReply}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageButton: {
    flexDirection: 'row',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
