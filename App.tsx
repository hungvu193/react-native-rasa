/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef } from 'react';
import { SafeAreaView, StatusBar, Button } from 'react-native';

import RasaChat, { IRasaChatHandles } from './RNRasa';

import styles from './styles';

// your host http://localhost:5005. Apps work better on https so you can use ngrok if development
const HOST = 'http://localhost:5005';

// Your bot
const botAvatar = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
const userAvatar = "https://images.unsplash.com/photo-1483884105135-c06ea81a7a80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"

//TODO: reset bot on destroy
//TODO: handle when bot response error

const App = () => {
  const rasaChatRef = useRef<IRasaChatHandles>(null);

  const clearMessages = () => {
    rasaChatRef?.current?.resetMessages();
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Button
          onPress={clearMessages}
          title="Clear messages"
          color="#2097F3"
        />
        <RasaChat
          ref={rasaChatRef}
          host={HOST}
          placeholder="Your input placeholder"
          botAvatar={botAvatar}
          userAvatar={userAvatar}
          showUserAvatar
        />
      </SafeAreaView>
    </>
  );
};

export default App;
