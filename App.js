import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, FlatList, listExpression, renderItem, Tab } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function App() {
    //Use state pour step 1
    const [character1, setCharacter1] = useState(null);
    const [character, setCharacter] = useState(null);

    const [quote1, setQuote1] = useState(null);
    const [quote, setQuote] = useState(null);

    const [input, setInput] = useState("");

    const [icon1, setIcon1] = useState(null);

    const [icon, setIcon] = useState(null);

    const Tab = createBottomTabNavigator();

    const getSimpSon = () => {
        return fetch('https://thesimpsonsquoteapi.glitch.me/quotes')
            .then((response) => response.json())
            .then((data) => {

                setCharacter('Nom: ' + data[0].character)
                setQuote('Citation: ' + data[0].quote)
                setIcon(data[0].image)
            })
            .catch((error) => {
                console.error(error);
            });
    };


    function Random() {

        const Item = () => (
            <View>
                <View style={styles.containerGlobal}>
                    <Image
                        style={styles.image}
                        source={{uri: icon}}/>
                    <View>
                        <Text style={styles.text}>{character}</Text>
                        <Text style={styles.text}>{quote}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => getSimpSon()}>
                    <Text style={styles.textButton}>Reload</Text>
                </TouchableOpacity>
            </View>
        );
        return (
            <View style={styles.carte}>
                <Item></Item>
            </View>

        );
    }

    useEffect(() => {
        (async () => {
            getSimpSon();
        })();
    }, []);


    function Recherche() {
        const getNomSimpson = () => {
            return fetch('https://thesimpsonsquoteapi.glitch.me/quotes?character=' + input)
                .then((response) => response.json())
                .then((json) => {
                    setCharacter1('Nom: ' + json[0].character)
                    setQuote1('Citation: ' + json[0].quote)
                    setIcon1(json[0].image)
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        return(
        <View style={styles.container}>
            <View style={styles.recherche}>
                <TextInput style={styles.input} placeholder="Entrez un nom" onChangeText={item => setInput(item)} clearButtonMode/>
                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => {
                        getNomSimpson();
                    }}
                >
                    <Text>Rechercher</Text>
                </TouchableOpacity>
                <SafeAreaView style={styles.container}>
                    <View style={styles.textcarte}>
                    </View>
                </SafeAreaView>
            </View>

            <View style={styles.carte}>
                <View style={styles.carte2}>
                    <Image
                        style={styles.tinyLogo}
                        source={{uri: icon1}}
                    />
                    <View style={styles.textcarte}>
                        <Text style={styles.text2}>{character1}</Text>
                        <Text style={styles.text2}>{quote1}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
    }



    useEffect(() => {
        (async () => {

        })();
    }, []);

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Random" component={Random} />
                <Tab.Screen name="Recherche" component={Recherche} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerGlobal:{
        backgroundColor:'#DAF7A6',
        padding:20,
        borderRadius:15,
    },
    containerFlatList:{
        backgroundColor:'#DAF7A6',
        borderRadius:15,
        padding:25,
    },
    button:{
        padding: 10,
        backgroundColor: 'orange',
        marginVertical:10,
        borderRadius: 10,
    },
    image: {
        width: 106,
        height: 200,
    }, imageExpression: {
        width: 90,
        height: 120,
    },
    text:{
        fontSize:21,
    },
    textFlatList:{
        fontSize:12,
    },
    textButton:{
        fontSize:21,
        textAlign:'center',
    },
    separator: {
        paddingBottom: 20
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 25
    },
    recherche: {
        alignContent: 'center',
        paddingLeft: 80,
        paddingBottom: 15,
        flexDirection: "row",
    },
    tinyLogo: {
        width: 106,
        height: 200,
        marginLeft: 10,
        marginRight: 20
    },
    samelesbrise: {
        alignItems: "center"
    },
    button2: {
        margin: 15,
        width: 100,
        backgroundColor: 'orange',
        marginVertical:10,
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        alignContent: "center"
    },
    carte: {
        flexDirection: "column",
        paddingLeft: 5
    },
    carte2: {
        flexDirection: 'row',
        borderWidth: 2,
        width: 400,
        backgroundColor: "pink",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,

    },
    textcarte: {
        flexDirection: 'column',
        width: 250,
        justifyContent: "center",
    },
    text2: {
        paddingBottom: 10,
        paddingTop: 10
    }
});
