if (__DEV__) {
    require("../ReactotronConfig");
}
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const HomeComponent = (props) => {
    const navigation = useNavigation();
    const onButtonClick = () => {
        navigation.navigate('Product');
    }
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Button onPress={onButtonClick} title="Go to Product" />
        </View>
    )
}
const ProductComponent = (props) => {

    const [todoList, setTodoList] = useState([]);

    const navigation = useNavigation();
    const onButtonClick = () => {
        navigation.navigate('Profile');
    }

    const getInitialTodoList = async () => {
        const todoListResponse = await axios.get('https://jsonplaceholder.typicode.com/todos')
        // const todoListResponse = await axios.get('http:localhost:3000/api/v1/products')
        setTodoList(todoListResponse.data);
    }

    useEffect(() => {
        getInitialTodoList();
    }, [])


    return (
        <View style={styles.container}>
            {props.route.params?.productId ? <Text>Product Detail ID: {props.route.params?.productId}</Text>

                :
                <>
                    <Text>Product Detail ID: {props.route.params?.productId}</Text>
                    <Text>Product</Text>
                    <Button onPress={onButtonClick} title="Go to Profile" />
                    <Button onPress={() => navigation.setOptions({ title: 'Product List' })} title="Change the Title" />
                    <ScrollView>
                        {todoList.map((todo) => (
                            <Pressable onPress={() => navigation.navigate('Product', { productId: todo.id })} key={todo.id}>
                                <Text style={{ fontWeight: 'bold' }}>ID: {todo.id}</Text>
                                <Text style={{ fontWeight: 'bold' }}>{todo.title}</Text>
                                <Text>status: {todo.completed ? 'completed' : 'not completed'}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </>
            }
        </View>
    )
}
const ProfileComponent = (props) => {
    const navigation = useNavigation();
    const onButtonClick = () => {
        navigation.navigate('Home');
    }
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <Button onPress={onButtonClick} title="Go to Home" />
        </View>
    )
}

const routeIconMapping = {
    Home: 'home',
    Product: 'cube',
    Profile: 'person',
}

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Tab.Navigator screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name={routeIconMapping[route.name]} size={size} color={color} />
                    },
                    tabBarActiveTintColor: 'darkturquoise',
                    tabBarInactiveTintColor: 'gray',
                    tabBarBadge: route.name == 'Product' ? '99+' : null
                    // tabBarShowLabel: false
                })} initialRouteName="Profile">
                    <Tab.Screen
                        name="Home"
                        component={HomeComponent} />
                    <Tab.Screen
                        options={{ headerShown: true }}
                        name="Product"
                        component={ProductComponent} />
                    <Tab.Screen
                        options={{
                            title: 'Profile and Settings',
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: 'darkturquoise'
                            },
                            headerTintColor: 'white',
                            headerTitleStyle: {
                                fontWeight: 'bold'
                            },
                            headerLeft: () => {
                                return <Pressable onPress={() => alert('back pressed')}>
                                    <Ionicons name="arrow-back" size={24} color="black" />
                                </Pressable>
                            },
                            headerRight: () => {
                                return <Pressable onPress={() => alert('hamberger pressed')}>
                                    <Text>Hamberger</Text>
                                </Pressable>
                            }
                        }}
                        name="Profile"
                        component={ProfileComponent} />
                </Tab.Navigator>
            </NavigationContainer>
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
