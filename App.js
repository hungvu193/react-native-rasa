/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import styles from './styles';
import RNRasa from './RNRasa';

// your host
const HOST = 'http://localhost:5005';

//TODO: reset bot on destroy
//TODO: handle when bot response error

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <RNRasa host={HOST} />
      </SafeAreaView>
    </>
  );
};

export default App;
