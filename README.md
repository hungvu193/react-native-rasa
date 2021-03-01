# react-native-rasa
A simple react native project integrated with Rasa Open Source with REST. Please see more at [Rasa Rest API](https://rasa.com/docs/rasa/connectors/your-own-website/#rest-channels).

This project used [react-native-gifted-chat](https://github.com/FaridSafi/react-native-gifted-chat) so you can use all the props from it.

## Install
```
yarn add react-native-rasa
```
or
```
npm install react-native rasa
```

## Setup your Rasa host
The REST channel will provide you with a REST endpoint where you can post user messages and receive the assistant's messages in response.

Add the REST channel to your credentials.yml:

```yml
rest:
  # you don't need to provide anything here - this channel doesn't
  # require any credentials
```
Restart your Rasa X or Rasa Open Source server to make the REST channel available to receive messages. You can then send messages to http://<host>:<port>/webhooks/rest/webhook, replacing the host and port with the appropriate values from your running Rasa X or Rasa Open Source server.

## Message Format
Please see more informations from Rasa Doc at [here](https://rasa.com/docs/rasa/connectors/your-own-website/#rest-channels), you also need to know about [react-native-gifted-chat message format](https://github.com/FaridSafi/react-native-gifted-chat#message-object) to understand how this libray works.

## How to use


### Running the Rasa and Action Server
At the root of your rasa project, run the following command to start the action server. It will be defaulted to port 5055. You can ignore this step if you don't use custom action.
```yml
rasa run actions
```
You should see the following output at the terminal
![action-server-img](https://github.com/hungvu193/react-native-rasa/blob/master/preview/action-server.png)

Open a new terminal and activate the same virtual environment. Change to directory to the same directory as the previous terminal. Run the following command to start the server. The default port is 5005.
```
rasa run --enable-api --cors "*"
```

`cors` is required to allow secure data transfer and prevent you from getting [Cross-Origin Resource Sharing error](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors). The terminal will show the following output. For Windows users, you need to use double quotes to ensure that CORS registered correctly.
![api-server-img](https://github.com/hungvu193/react-native-rasa/blob/master/preview/enable-api.png)

### Add chat to your react-native app
```javascript
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import RNRasa from 'react-native-rasa';
// your rasa host, for example:
const HOST = 'http://localhost:5005';
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <RNRasa 
          host={HOST}
          onSendMessFailed={(error) => console.log(error)}
          emptyResponseMessage="Sorry, I don't understand"
          onEmptyResponse={() => console.log("Handle with your custom action")}
        />
      </SafeAreaView>
    </>
  );
};

export default StyleSheet.create({
  container: {
    flex: 1,
  }
});
```


## Props
<!-- onSendMessFailed, onEmptyResponse, emptyResponseMessage -->
- **`host`** _(string)_ - Your Rasa host, `http://<host>:<port>/webhooks/rest/webhook`, replacing the host and port with the appropriate values from your running Rasa X or Rasa Open Source server.
- **`onSendMessFailed`** _(Function)_ - Callback when sending a message failed.
- **`onEmptyResponse`** _(Function)_ - Callback when the bot return empty reponse (Sometimes it happens to Rasa Open Source).
- **`emptyResponseMessage`** _(String)_ - The message the bot will return in case the reponse is empty. 
- You can also use all the props from [react-native-gifted-chat](https://github.com/FaridSafi/react-native-gifted-chat)

## Preview
<p float="left">
  <img src="https://github.com/hungvu193/ReactNativeRasa/blob/master/preview/Simulator%20Screen%20Shot%20-%20iPhone%2011%20-%202020-12-25%20at%2017.05.06.png" width="200" />
  <img src="https://github.com/hungvu193/ReactNativeRasa/blob/master/preview/Simulator%20Screen%20Shot%20-%20iPhone%2011%20-%202020-12-25%20at%2017.05.14.png" width="200" /> 
  <img src="https://github.com/hungvu193/ReactNativeRasa/blob/master/preview/Simulator%20Screen%20Shot%20-%20iPhone%2011%20-%202020-12-25%20at%2017.05.17.png" width="200" />
</p>

### TODO List:
- [ ] Reset bot on destroy
- [ ] Add restart bot options
- [ ] Add bot avatar
- [ ] Handle bot attachment
- [ ] Voice support

PR are welcome ❤️

## License

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
