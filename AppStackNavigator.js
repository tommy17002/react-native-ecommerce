import { Button, Pressable, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { useState, useEffect } from "react";

const Stack = createNativeStackNavigator();

const HomeComponent = (props) => {
  const navigation = useNavigation();
  const onButtonClick = () => {
    navigation.navigate("Product");
  };
  return (
    <View>
      <Text>Home</Text>
      <Button onPress={onButtonClick} title="Go to Product" />
    </View>
  );
};

const ProductComponent = (props) => {
  const navigation = useNavigation();
  const [todoList, setTodoList] = useState([]);
  const onButtonClick = () => {
    navigation.navigate("Profile");
  };

  const getInitialTodoList = async () => {
    const todoListResp = await axios.get(
      // "https://jsonplaceholder.typicode.com/todos"
      "http://10.10.103.234:3000/api/v1/products"
    );
    setTodoList(todoListResp.data?.items || []);
  };

  useEffect(() => {
    getInitialTodoList();
  }, []);

  return (
    <View>
      {props.route.params?.productId ? (
        <Text>Product Detail ID: {props.route.params?.productId}</Text>
      ) : (
        <>
          <Text>Product</Text>
          <Button onPress={onButtonClick} title="Go to Profile" />
          <Button
            onPress={() => {
              navigation.setOptions({
                title: "Berubah jadi product list",
              });
            }}
            title="Change the title"
          />
          {todoList.map((todoItem) => {
            return (
              <Pressable
                key={todoItem.id}
                onPress={() => {
                  navigation.push(`Product`, {
                    productId: todoItem.id,
                  });
                }}
              >
                <Text style={{ fontWeight: "bold" }}>ID: {todoItem.id}</Text>
                <Text style={{ fontWeight: "bold" }}>
                  Name: {todoItem.name}
                </Text>
                <Text>Description: {`"${todoItem.description}"`}</Text>
              </Pressable>
            );
          })}
        </>
      )}
    </View>
  );
};

const ProfileComponent = (props) => {
  const navigation = useNavigation();
  const onButtonClick = () => {
    // navigation.navigate("Home"); // reset navigation statcks
    navigation.push("Home");
  };
  return (
    <View>
      <Text>Profile</Text>
      <Button onPress={onButtonClick} title="Go to Home" />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Profile"
      >
        <Stack.Screen name="Home" component={HomeComponent} />
        <Stack.Screen
          options={{
            headerShown: true,
          }}
          name="Product"
          component={ProductComponent}
        />
        <Stack.Screen
          options={{
            title: "Profile and Settings",
            headerShown: true,
            headerStyle: {
              backgroundColor: "aqua",
            },
            headerTintColor: "red",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: (props) => {
              return (
                <Pressable
                  onPress={() => {
                    alert("hamberger clicked");
                  }}
                >
                  <Text>Hamberger</Text>
                </Pressable>
              );
            },
            headerLeft: (props) => {
              return (
                <Pressable
                  onPress={() => {
                    alert("back button clicked");
                  }}
                >
                  <Text style={{ marginRight: 10 }}>{"<="}</Text>
                </Pressable>
              );
            },
          }}
          name="Profile"
          component={ProfileComponent}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

if (__DEV__) {
  require("./ReactotronConfig");
}
