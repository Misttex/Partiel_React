import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, FlatList, listExpression, renderItem } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

export default function App() {
    const [character, setCharacter] = useState(null);
    const [quote, setQuote] = useState(null);
    const [icon, setIcon] = useState(null);
    const [input, setInput] = useState("");
    const [listQuote, setlistQuote] = useState(null);

    const ItemSaisir = (data) => (
        <View>
            <View style={styles.containerGlobal}>
                <Image
                    style={styles.image}
                    source={{uri: data.icon}}/>
                <View>
                    <Text style={styles.text}>{data.character}</Text>
                    <Text style={styles.text}>{data.quote}</Text>
                </View>
            </View>
        </View>
    );

    const renderItem = ({item}) => (
        <TouchableOpacity><ItemSaisir data={item} /></TouchableOpacity>
    );


    const getNomSimpson = () => {
        return fetch('https://thesimpsonsquoteapi.glitch.me/quotes?character=' + input)
            .then((response) => response.json())
            .then((json) => {
                setCharacter('Nom: ' + json[0].character)
                setQuote('Citation: ' + json[0].quote)
                setIcon(json[0].image)
                console.log(input)
                console.log(json[0].character)
                return json.name
            })
            .catch((error) => {
                console.error(error);
            });
    }


    useEffect(() => {
        (async () => {
            // getNomChar();
        })();
    }, []);

    return (
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
                        source={{uri: icon}}
                    />
                    <View style={styles.textcarte}>
                        <Text style={styles.text2}>{character}</Text>
                        <Text style={styles.text2}>{quote}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    button: {
        padding: 10,
        width: 80,
        backgroundColor: 'orange',
        marginVertical:10,
        borderRadius: 10,
        borderWidth: 2,
        alignItems: "center",
        alignContent: "center"
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
