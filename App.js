if (__DEV__) {
  require("./ReactotronConfig");
}
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const BottomTab = createMaterialBottomTabNavigator();

const TopTab = createMaterialTopTabNavigator();

const DummyComponent = (name) => () => {
  return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{name}</Text>
  </View>
}

const BottomTabScreens = () => {
  return (
      <TopTab.Navigator>
          <TopTab.Screen name="Profile" component={DummyComponent('Profile')} />
          <TopTab.Screen name="Notification" component={DummyComponent('Notification')} />
      </TopTab.Navigator>
  )
}

export default function App() {
  return (
      <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
              <NavigationContainer>
                  <BottomTab.Navigator>
                      <BottomTab.Screen name="Home" component={DummyComponent('Home')} />
                      <BottomTab.Screen name="Profile" component={DummyComponent('Product')} />
                      <BottomTab.Screen name="Setting" component={BottomTabScreens} />
                  </BottomTab.Navigator>
              </NavigationContainer>
          </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  }
});
