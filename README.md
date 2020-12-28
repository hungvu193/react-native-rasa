# ReactNativeRasa
An simple react native project intergrate with Rasa Open Source

# Install
```
yarn add react-native-rasa
```
or
```
npm install react-native rasa
```

# How to use
```javascript
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import RNRasa from 'react-native-rasa';

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

export default StyleSheet.create({
  container: {
    flex: 1,
  }
});
```

# Preview
<p float="left">
  <img src="https://github.com/hungvu193/ReactNativeRasa/blob/master/preview/Simulator%20Screen%20Shot%20-%20iPhone%2011%20-%202020-12-25%20at%2017.05.06.png" width="200" />
  <img src="https://github.com/hungvu193/ReactNativeRasa/blob/master/preview/Simulator%20Screen%20Shot%20-%20iPhone%2011%20-%202020-12-25%20at%2017.05.14.png" width="200" /> 
  <img src="https://github.com/hungvu193/ReactNativeRasa/blob/master/preview/Simulator%20Screen%20Shot%20-%20iPhone%2011%20-%202020-12-25%20at%2017.05.17.png" width="200" />
</p>

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
