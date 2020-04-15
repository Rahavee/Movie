import React, {useState, useEffect} from 'react';
import {Icon} from 'react-native-elements'
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {AsyncStorage, FlatList, TouchableOpacity, ScrollView, StyleSheet, Button, Text, View} from 'react-native';



const Stack = createStackNavigator();






function Home({navigation}) {
    const [list, setList] = useState([]);
    const [movies, setMovies] = useState([]);
    const [edit, setEdit] = React.useState(false);



    async function retrieveData() {
        try {
            const value = await AsyncStorage.getItem("save");

            if (value !== "undefined" && value.length!==2) {
                console.log("somehow inside");
                let temp = await AsyncStorage.getItem("original");
                setMovies( JSON.parse(temp));
                return JSON.parse(value);
            }
            console.log("setting movies");
            setMovies( [
                {key: "Spartacus", genre: "Action, Thriller", desc: "The life of Spartacus, the gladiator who lead a rebellion against the Romans. From his time as an ally of the Romans, to his betrayal and becoming a gladiator, to the rebellion he leads and its ultimate outcome"},
                {key: "The Expanse", genre: "Sci-fi", desc: "A police detective in the asteroid belt, the first officer of an interplanetary ice freighter, and an earth-bound United Nations executive slowly discover a vast conspiracy that threatens the Earth's rebellious colony on the asteroid belt"},
                {key: "Mr.Robot", genre: "Technology", desc: "Elliot, a brilliant but highly unstable young cyber-security engineer and vigilante hacker, becomes a key figure in a complex game of global dominance when he and his shadowy allies try to take down the corrupt corporation he works for"},
                {key: "Money Heist", genre: "Action, Thriller", desc: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain"},
                {key: "300", genre: "Action, History", desc: "King Leonidas of Sparta and a force of 300 men fight the Persians at Thermopylae in 480 B.C."},
                {key: "You", genre: "Drama", desc: "A dangerously charming, intensely obsessive young man goes to extreme measures to insert himself into the lives of those he is transfixed by"},
                {key: "The Godfather", genre: "Crime, Drama", desc: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son"},
                {key: "The Shawshank Redemption", genre: "Drama", desc: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency"},
                {key: "Schindler's List", genre: "Biography, Drama, History", desc: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis"},
                {key: "Raging Bull", genre: "Biography, Drama, Sport", desc: "The life of boxer Jake LaMotta, whose violence and temper that led him to the top in the ring destroyed his life outside of it"},
                {key: "Gone with the Wind", genre: "Drama, History, Romance", desc: "A manipulative woman and a roguish man conduct a turbulent romance during the American Civil War and Reconstruction periods"},
                {key: "Wizard of Oz", genre:"Adventure, Family, Fantasy", desc: "Dorothy Gale is swept away from a farm in Kansas to a magical land of Oz in a tornado and embarks on a quest with her new friends to see the Wizard who can help her return home to Kansas and help her friends as well"},
                {key: "One Flew Over the Cuckoo's Nest", genre: "Drama", desc: "A criminal pleads insanity and is admitted to a mental institution, where he rebels against the oppressive nurse and rallies up the scared patients"},
                {key: "Lawrence of Arabia", genre: "Adventure, Biography, Drama", desc: "The story of T.E. Lawrence, the English officer who successfully united and led the diverse, often warring, Arab tribes during World War I in order to fight the Turks"},
                {key: "Vertigo", genre: "Mystery, Romance, Thriller", desc: "A former police detective juggles wrestling with his personal demons and becoming obsessed with a hauntingly beautiful woman"},
                {key: "Psycho", genre: "Horror, Mystery, Thriller", desc: "A Phoenix secretary embezzles forty thousand dollars from her employer's client, goes on the run, and checks into a remote motel run by a young man under the domination of his mother"},
                {key: "On the Waterfront", genre: "Crime, Drama, Thriller", desc: "An ex-prize fighter turned longshoreman struggles to stand up to his corrupt union bosses"},
                {key: "Angry Men", genre: "Drama", desc: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence"}
            ]);
            return []
        } catch (error) {
            console.error("I messed up: " + error)
        }
    }
    useEffect(() => {
        retrieveData().then((newList) => {
            setList(newList);
            console.log(movies);
        });
    }, [navigation, setEdit]);


    React.useLayoutEffect(() => {

        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => {
                    setEdit(a=>!a)
                }} title="Edit" />
            ),
        });
    }, [navigation, setEdit]);


    // console.log(edit + " edit");
    return (
        <View style={{backgroundColor:"green", flex:1}}>

            <View style={{ position: "absolute", bottom: 0, right: 0,zIndex:34}}>

                <Icon
                    raised name="add" onPress={async () => {
                    console.log("I was pressed");
                    console.log(movies);
                    if (movies.length !== 0) {
                        setList([...list, movies.pop()]);
                        console.log("inside the if" + list)
                    }
                    try {
                        await AsyncStorage.setItem("save", JSON.stringify(list));
                        await AsyncStorage.setItem("original", JSON.stringify(movies));
                    } catch (error) {
                        console.error("Had error saving the data")
                    }
                }}/>

            </View>
            <ScrollView style={styles.container}>

                <FlatList
                    data={list}
                    extraData={edit}
                    renderItem={({item}) =>
                        <View>

                        <TouchableOpacity style={styles.item}
                                onPress={
                                    () => {
                                        navigation.navigate("Details", {item})
                                    }
                                }>

                            <Text >
                                <Icon iconStyle={{visibility: edit ? "visible" : "hidden"}} name="delete" />
                                {item.key}
                                <Icon iconStyle={{visibility: edit ? "visible" : "hidden"}} name="reorder"/>

                            </Text>
                        </TouchableOpacity>
                        </View>}
                />

            </ScrollView>

        </View>

    );

}

function Details({route, navigation}) {
    const {item} = route.params;

    return (
        <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center', height: 44}}>
            <Text>{item.key}</Text>
            <Text>Genre: {item.genre}</Text>
            <Text>Description: {item.desc}</Text>
        </View>
    );
}

export default function App() {
    console.log("app rendered");
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Details" component={Details}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 10,
        backgroundColor: "gray",
    },
    item: {
        marginTop: 3,
        padding: 10,
        height: 44,
        backgroundColor: "white"
    },
    card: {
        backgroundColor: "gray",
    }
});

