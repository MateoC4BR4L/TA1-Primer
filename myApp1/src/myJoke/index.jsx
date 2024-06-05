import React from "react";
import { useState, useEffect } from "react";
import { Image, Text, View, StyleSheet, Button } from "react-native";

export default MyJoke = () => {
    const [joke, setJoke] = useState("");

    const CallJoke = async () => {
        try {
            const response = await fetch("https://api.chucknorris.io/jokes/random", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            return data.value;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        CallJoke().then((joke) => { setJoke(joke) });
    }, []);
    console.log(joke);
    return (
        <View>
            <Text style={styles.sectionDescription}>{joke}</Text>
            <Button title="Generate new joke"
                onPress={
                    async () => {
                        const newJoke = await CallJoke();
                        setJoke(newJoke);
                    }} />
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%'
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        color: 'red',
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});
