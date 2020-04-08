import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {FlatList, ScrollView, StyleSheet, Button, Text, View} from 'react-native';

const Stack = createStackNavigator();


function Home({navigation}) {
    return (
        <ScrollView style={styles.container}>
            <FlatList
                data={[
                    "Spartacus", "The Expanse", "Mr.Robot", "Money Heist", "300", "You"
                ]}
                renderItem={({item}) =>
                    <Button style={styles.item}
                    onPress={()=>navigation.navigate("Details")}
                    title={item}>
                </Button>}
            />

        </ScrollView>
    );
}

function Details() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    )
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

