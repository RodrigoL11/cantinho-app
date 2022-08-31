import React from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '@screens/SignIn'

const { Navigator, Screen } = createNativeStackNavigator();

export function Auth() {
    return(
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name="SignIn"
          component={SignIn}
        />
      </Navigator>
    )
}