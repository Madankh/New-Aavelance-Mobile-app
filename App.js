import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'
import Routees from './Navigation/Routees';
import {Provider} from 'react-redux';
import {store , persistor} from "./redux/store"
import { PersistGate } from 'redux-persist/integration/react'


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <View style={{ flex: 1 }}>
          <Routees />
      </View>
      </PersistGate>
      </Provider>
    
  )
}

export default App