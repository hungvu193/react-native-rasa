/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef } from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';

import RasaChat, { Send, InputToolbar, Composer, Actions, IRasaChatHandles } from './RNRasa';

import styles from './styles';

// your host http://localhost:5005. Apps work better on https so you can use ngrok if development
const HOST = 'http://localhost:5005';

// Avatar images
const botAvatar = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
const userAvatar = "https://images.unsplash.com/photo-1483884105135-c06ea81a7a80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"

//TODO: reset bot on destroy
//TODO: handle when bot response error

const App = () => {
  const rasaChatRef = useRef<IRasaChatHandles>(null);

  const resetMessages = () => {
    rasaChatRef?.current?.resetMessages();
  }

  const resetBot = () => {
    rasaChatRef?.current?.resetBot();
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <RasaChat
          ref={rasaChatRef}
          host={HOST}
          placeholder="Your input placeholder"
          botAvatar={botAvatar}
          userAvatar={userAvatar}
          showUserAvatar
          renderInputToolbar={(props) => (
            <InputToolbar
              {...props}
              containerStyle={{
                // backgroundColor: '#d4d4d8',
                paddingTop: 3,
                paddingBottom: 3,
                marginTop: 10,
                marginBottom: -2

              }}
              primaryStyle={{ alignItems: 'center' }}
            />
          )}
          renderActions={(props) => (
            <Actions
              {...props}
              containerStyle={styles.containerActions}
              options={{
                'Clear messages': resetMessages,
                'Reset Bot': resetBot,
                'Cancel': () => {},
              }}
            />
          )}
          renderComposer={(props) => (
            <Composer
              {...props}
              textInputStyle={styles.textComposer}
            />
          )}
          alwaysShowSend
          renderSend={(props) => {
            return (
              <Send
                {...props}
                disabled={!props.text}
                containerStyle={styles.sendContainer}
              >
                <Text style={{color: !props.text ? '#d6d3d1' : '#2097F3'}}>Send</Text>
              </Send >
            );
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default App;
