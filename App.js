import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, FlatList, TextInput} from 'react-native';
import React, { useState, useEffect } from 'react';
import {TouchableOpacity} from "react-native";
import {SafeAreaView} from "react-native";


export default function App() {

    //Use state pour step 1
    const [character1, setCharacter] = useState(null);

    const [quote1, setQuote] = useState(null);

    const [icon1, setIcon] = useState(null);

    //UseState pour step 2
    const [listExpression, setListeExpression] = useState(null);

    const [number,setNumber] = useState(0);

    //Use state pour step 3
    const [character2, setCharacter2] = useState(null);

    const [quote2, setQuot2] = useState(null);

    const [icon2, setIco2] = useState(null);

    const [nomSimpson, setNomSimpson] = useState("");

    const getNomSimpson = () => {
        return fetch('https://thesimpsonsquoteapi.glitch.me/quotes?character=' + nomSimpson)
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
    const getSimpSonExpression = () => {
        return fetch('https://thesimpsonsquoteapi.glitch.me/quotes?count='+nomSimpson)
            .then((response) => response.json())
            .then((data) => {
                setListeExpression(data)
                //console.log(data)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        (async () => {
            getSimpSon();
        })();
    }, []);

    const Item = () => (
        <View>
            <View style={styles.containerGlobal}>
                <Image
                    style={styles.image}
                    source={{uri: icon1}}/>
                <View>
                    <Text style={styles.text}>{character1}</Text>
                    <Text style={styles.text}>{quote1}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => getSimpSon()}>
                <Text style={styles.textButton}>Reload</Text>
            </TouchableOpacity>
        </View>
    );

    const ItemSaisir = (data) => (
        <View>
            <View style={styles.containerFlatList}>
                <Image
                    style={styles.imageExpression}
                    source={{uri: data.data.image}}/>
                <View>
                    <Text style={styles.textFlatList}>Nom : {data.data.character}</Text>
                    <Text style={styles.textFlatList}>Description : {data.data.quote}</Text>
                </View>
            </View>
        </View>
    );

    const ItemStep3 = (data) => (
        <View style={styles.container}>
            <View>
                <TextInput placeholder="Entrez un nom" onChangeText={item => setNomSimpson(item)}/>
                <TouchableOpacity
                    onPress={() => {
                        getNomSimpson();
                    }}
                >
                    <Text>Chercher</Text>
                </TouchableOpacity>
                <SafeAreaView style={styles.container}>
                    <View style={styles.textcarte}>
                    </View>
                </SafeAreaView>
            </View>

            <View>
                <View >
                    <Image
                        style={styles.tinyLogo}
                        source={{uri: icon2}}
                    />
                    <View style={styles.textcarte}>
                        <Text style={styles.text2}>{character2}</Text>
                        <Text style={styles.text2}>{quote2}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const renderItem = ({item}) => (
        <TouchableOpacity><ItemSaisir data={item} /></TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Item/>
            <View >
                <Text >Saisir un nombre</Text>
                <TextInput placeholder={"Saisir le nombre d'expression à afficher"} editable maxLength={15} onChangeText={item=>setNumber(item)} clearButtonMode/>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={getSimpSonExpression}
                    >
                        <Text style={styles.textButton}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <SafeAreaView style={styles.container}>
                <FlatList data={listExpression} renderItem={renderItem}/>
            </SafeAreaView>
        </SafeAreaView>
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
    }
});
