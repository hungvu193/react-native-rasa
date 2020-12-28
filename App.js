/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import RasaChat from 'react-native-rasa';

import styles from './styles';

// your host
const HOST = 'http://localhost:5005';

//TODO: reset bot on destroy
//TODO: handle when bot response error

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <RasaChat
          host={HOST}
          onSendMessFailed={(error) => console.log(error)}
        />
      </SafeAreaView>
    </>
  );
};

export default App;
