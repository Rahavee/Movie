import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {FlatList, ScrollView, StyleSheet, Button, Text, View} from 'react-native';

const Stack = createStackNavigator();
const movies = [
    {name: "Spartacus", genre: "Action, Thriller", desc: "The show follows the life of a  gladiator in rome"},
    {name: "The Expanse", genre: "Sci-fi", desc: "It is a space detective show"},
    {name: "Mr.Robot", genre: "Technology", desc: "It follows a guy who wants to be a hacker"},
    {name: "Money Heist", genre: "Action, Thriller", desc: "Rob a bank"},
    {name: "300", genre: "Action, History", desc: "Gladiator in Rome"},
    {name: "You", genre: "Drama", desc: "A crazy person follows his crush"}
];


function Home({navigation}) {
    return (
        <ScrollView style={styles.container}>
            <FlatList
                data={movies}
                renderItem={({item}) =>
                    <Button style={styles.item}
                            onPress={
                                () => navigation.navigate("Details", {item})
                            }
                            title={item.name}>
                    </Button>}
            />

        </ScrollView>
    );
}

function Details({route, navigation}) {
    const {item} = route.params;
    return (
        <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center', fontSize: 18, height: 44, color: "black"}}>
            <Text>{item.name}</Text>
            <Text>Genre: {item.genre}</Text>
            <Text>Description: {item.desc}</Text>
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Details" component={Details}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: "gray",
    },
    item: {
        marginTop: 3,
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor: "white"
    },
    card: {
        backgroundColor: "gray",
    }
});

