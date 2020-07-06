import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import Question from './screens/Question';
import Access from './screens/Access';
import Register from './screens/Register';

const AppStack = createStackNavigator();

export default function routes() {

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Home" component={Home}  />
        <AppStack.Screen name="Question" component={Question}  />
        <AppStack.Screen name="Access" component={Access} />
        <AppStack.Screen name="Register" component={Register} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
