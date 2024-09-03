// In App.js in a new project

import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeComponent = (props) => {
  const navigation = useNavigation();
  const onButtonClick = () => {
    navigation.navigate("Product");
  };
  return (
    <View>
      <Text>Home</Text>
      <Button onPress={onButtonClick} title="Go to Product"/>
    </View>
  )
}

const ProductComponent = (props) => {
  const navigation = useNavigation();
  const onButtonClick = () => {
    navigation.navigate("Profile");
  };
  return (
    <View>
      <Text>Product</Text>
      <Button onPress={onButtonClick} title="Go to Profile"/>
    </View>
  )
}

const ProfileComponent = (props) => {
  const navigation = useNavigation();
  const onButtonClick = () => {
    // navigation.navigate("Home");
    navigation.push("Home")
  };
  return (
    <View>
      <Text>Profile</Text>
      <Button onPress={onButtonClick} title="Go to Home"/>
    </View>
  )
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Product'>
        <Stack.Screen name="Home" component={HomeComponent} />
        <Stack.Screen name="Product" component={ProductComponent} />
        <Stack.Screen name="Profile" component={ProfileComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"center"
  }
})

export default App;