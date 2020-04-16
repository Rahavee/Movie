import React, {useState, useEffect} from 'react';
import {Icon} from 'react-native-elements'
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {
    AsyncStorage,
    FlatList,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Button,
    Text,
    TextInput,
    View
} from 'react-native'

const Stack = createStackNavigator();

function Home({navigation}) {
    const [list, setList] = useState([]);
    const [movies, setMovies] = useState([]);
    const [edit, setEdit] = React.useState(false);

    async function retrieveData() {
        try {
            const value = await AsyncStorage.getItem("save");
            if (value !== "undefined" && value !== null && value.length !== 2) {
                console.log("somehow inside");
                let temp = await AsyncStorage.getItem("original");
                setMovies(JSON.parse(temp));
                return JSON.parse(value);
            }
            console.log("setting movies");
            setMovies([
                {
                    key: "0",
                    name: "Spartacus",
                    genre: "Action, Thriller",
                    desc: "The life of Spartacus, the gladiator who lead a rebellion against the Romans. From his time as an ally of the Romans, to his betrayal and becoming a gladiator, to the rebellion he leads and its ultimate outcome"
                },
                {
                    key: "1",
                    name: "The Expanse",
                    genre: "Sci-fi",
                    desc: "A police detective in the asteroid belt, the first officer of an interplanetary ice freighter, and an earth-bound United Nations executive slowly discover a vast conspiracy that threatens the Earth's rebellious colony on the asteroid belt"
                },
                {
                    key: "2",
                    name: "Mr.Robot",
                    genre: "Technology",
                    desc: "Elliot, a brilliant but highly unstable young cyber-security engineer and vigilante hacker, becomes a name figure in a complex game of global dominance when he and his shadowy allies try to take down the corrupt corporation he works for"
                },
                {
                    key: "3",
                    name: "Money Heist",
                    genre: "Action, Thriller",
                    desc: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain"
                },
                {
                    key: "4",
                    name: "300",
                    genre: "Action, History",
                    desc: "King Leonidas of Sparta and a force of 300 men fight the Persians at Thermopylae in 480 B.C."
                },
                {
                    key: "5",
                    name: "You",
                    genre: "Drama",
                    desc: "A dangerously charming, intensely obsessive young man goes to extreme measures to insert himself into the lives of those he is transfixed by"
                },
                {
                    key: "6",
                    name: "The Godfather",
                    genre: "Crime, Drama",
                    desc: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son"
                },
                {
                    key: "7",
                    name: "The Shawshank Redemption",
                    genre: "Drama",
                    desc: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency"
                },
                {
                    key: "8",
                    name: "Schindler's List",
                    genre: "Biography, Drama, History",
                    desc: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis"
                },
                {
                    key: "9",
                    name: "Raging Bull",
                    genre: "Biography, Drama, Sport",
                    desc: "The life of boxer Jake LaMotta, whose violence and temper that led him to the top in the ring destroyed his life outside of it"
                },
                {
                    key: "10",
                    name: "Gone with the Wind",
                    genre: "Drama, History, Romance",
                    desc: "A manipulative woman and a roguish man conduct a turbulent romance during the American Civil War and Reconstruction periods"
                },
                {
                    key: "11",
                    name: "Wizard of Oz",
                    genre: "Adventure, Family, Fantasy",
                    desc: "Dorothy Gale is swept away from a farm in Kansas to a magical land of Oz in a tornado and embarks on a quest with her new friends to see the Wizard who can help her return home to Kansas and help her friends as well"
                },
                {
                    key: "12",
                    name: "One Flew Over the Cuckoo's Nest",
                    genre: "Drama",
                    desc: "A criminal pleads insanity and is admitted to a mental institution, where he rebels against the oppressive nurse and rallies up the scared patients"
                },
                {
                    key: "13",
                    name: "Lawrence of Arabia",
                    genre: "Adventure, Biography, Drama",
                    desc: "The story of T.E. Lawrence, the English officer who successfully united and led the diverse, often warring, Arab tribes during World War I in order to fight the Turks"
                },
                {
                    key: "14",
                    name: "Vertigo",
                    genre: "Mystery, Romance, Thriller",
                    desc: "A former police detective juggles wrestling with his personal demons and becoming obsessed with a hauntingly beautiful woman"
                },
                {
                    key: "15",
                    name: "Psycho",
                    genre: "Horror, Mystery, Thriller",
                    desc: "A Phoenix secretary embezzles forty thousand dollars from her employer's client, goes on the run, and checks into a remote motel run by a young man under the domination of his mother"
                },
                {
                    key: "16",
                    name: "On the Waterfront",
                    genre: "Crime, Drama, Thriller",
                    desc: "An ex-prize fighter turned longshoreman struggles to stand up to his corrupt union bosses"
                },
                {
                    key: "17",
                    name: "Angry Men",
                    genre: "Drama",
                    desc: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence"
                }
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
                <Button
                    style={styles.editButton}
                    onPress={() => {
                        setEdit(a => !a)
                    }} title="Edit"/>
            ),
        });
    }, [navigation, setEdit]);


    return (
        <View style={styles.homeWrapper}>

            <View style={styles.addButton}>

                <Icon
                    raised name="add" onPress={async () => {
                    console.log("I was pressed");
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
                                                      navigation.navigate("Details", {item, list, setList})
                                                  }
                                              }>
                                <Icon iconStyle={{
                                    marginLeft: 5,
                                    marginRight: 20,
                                    display: edit ? "flex" : "none"
                                }} name="delete"
                                      onPress={async () => {
                                          alert("You deleted an item");
                                          let tempList = list.filter((i) => {
                                              return i.name !== item.name
                                          });
                                          setList(tempList);
                                          try {
                                              await AsyncStorage.setItem("save", JSON.stringify(tempList));
                                          } catch (error) {
                                              console.error("Had error saving the data")
                                          }

                                      }}/>
                                <Text style={styles.itemText}>
                                    {item.name}
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
    const {list} = route.params;
    const {setList} = route.params;
    const [name, changeName] = useState(item.name);
    const [genre, changeGenre] = useState(item.genre);
    const [desc, changeDesc] = useState(item.desc);
    const [edit, setEdit] = useState(false);


    React.useLayoutEffect(() => {

        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => {
                    setEdit(a => !a)
                }} title="Edit"/>
            ),
        });
    }, [navigation, setEdit]);

    async function save() {
        try {
            await AsyncStorage.setItem("save", JSON.stringify(list));
        } catch (error) {
            console.error("Had error saving the data")
        }
    }

    console.log(name, genre, desc);

    return (
        <View
            style={styles.detailPage}>
            <Text style={styles.detailHeader}>Name: </Text>
            <TextInput
                style={{
                    borderWidth: edit ? 2 : 0,
                    height: 30,
                    backgroundColor: "white",
                    borderColor: "gray",
                    borderRadius: 4,
                    padding: 5
                }}
                editable={edit}
                onChangeText={(text) => {
                    changeName(text);
                    let temp = list.map((it) => {
                        if (it.key === item.key) {
                            it.name = text;

                        }
                        return it;
                    });
                    setList(temp);
                    save();
                }}
                value={name}
            />
            <Text style={styles.detailHeader}>Genre: </Text><TextInput
            style={{
                borderWidth: edit ? 2 : 0,
                height: 40,
                backgroundColor: "white",
                borderColor: "gray",
                borderRadius: 4,
                padding: 5
            }}
            editable={edit}
            onChangeText={(text) => {
                changeGenre(text);
                let temp = list.map((it) => {
                    if (it.key === item.key) {
                        it.genre = text;

                    }
                    return it;
                });
                setList(temp);
                save();
            }}
            value={genre}
        />
            <Text style={styles.detailHeader}>Description: </Text><TextInput
            style={{
                borderWidth: edit ? 2 : 0,
                height: 180,
                backgroundColor: "white",
                borderColor: "gray",
                borderRadius: 4,
                padding: 5
            }}
            editable={edit}
            multiline={true}
            onChangeText={(text) => {
                changeDesc(text);
                let temp = list.map((it) => {
                    if (it.key === item.key) {
                        it.desc = text;

                    }
                    return it;
                });
                setList(temp);
                save();
            }}
            value={desc}
        />
            <View style={styles.addButton}>
                <Icon raised name="delete"
                      onPress={async () => {
                          alert("You deleted an item");
                          let tempList = list.filter((i) => {
                              return i.name !== item.name
                          });
                          setList(tempList);
                          try {
                              await AsyncStorage.setItem("save", JSON.stringify(tempList));
                          } catch (error) {
                              console.error("Had error saving the data")
                          }
                          navigation.navigate("Home")
                      }}/>
            </View>
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
    homeWrapper: {
        flex: 1
    },
    addButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        zIndex: 34
    },
    editButton: {
        marginRight: 10,
    },
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: "lightgray",
    },
    item: {
        flexDirection: "row",
        marginTop: 3,
        padding: 10,
        height: 44,
        backgroundColor: "white"
    },
    itemText: {
        fontSize: 15,
    },
    card: {
        backgroundColor: "lightgray",
    },
    detailPage: {
        padding: 20,
        flex: 1,
        height: 44,

    },
    detailHeader: {
        fontWeight: "bold",
        marginTop: 10,
        height: 40,
        flexDirection: "row"
    },


});

