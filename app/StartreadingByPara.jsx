import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios'
import { Picker } from '@react-native-picker/picker';

const StartreadingByPara = () => {
    const [selectedValue, setSelectedValue] = useState(1);
    const [translation, setTranslation] = useState([])
    const [surahData, setSurahData] = useState([])
    const [allData, SetAllData] = useState([])

    const getSurah = async (value) => {
        console.log(value)
        const res = await axios.get(`https://api.alquran.cloud/v1/juz/${value}`)
        const trans = await axios.get(`https://api.alquran.cloud/v1/juz/${value}/ur.ahmedali`)
        setTranslation(trans.data.data.ayahs)
        console.log(translation)
        const data = res.data.data.ayahs
        SetAllData(res.data)
        setSurahData(data)
    }
    const totalPara = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

    useEffect(() => {
        getSurah(selectedValue)
    }, [selectedValue])



    const playAudio = async (sound1) => {
        const { sound, status } = await Audio.Sound.createAsync(
            {
                uri: sound1,
                headers: {
                    key: sound1,
                },
            },
            { isLooping: false },
        );
        if (status.isLoaded) {
            await sound.playAsync();
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                style={styles.picker}
            >
                {totalPara.map((para) => {
                    return <Picker.Item key={para} label={`Para ${para}`} value={para} />
                })}
            </Picker>
            <View style={styles.header}>
                <Text style={styles.title}>{allData?.data?.name}</Text>
                <Text style={styles.subtitle}>
                    {allData?.data?.englishName} - {allData?.data?.englishNameTranslation}
                </Text>
                <Text style={styles.edition}>Reciter: {allData?.data?.edition?.name}</Text>
            </View>
            {surahData.map((ayah, index) => (
                <View key={index} style={styles.ayahContainer}>
                    <Text style={styles.ayahText}>{ayah.text}</Text>
                    <Text style={styles.translation}>{translation[index].text}</Text>
                    <Text style={styles.ayahNumber}>Ayah {ayah.numberInSurah}</Text>
               
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#f0f0f0',
      },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
    },
    edition: {
        fontSize: 14,
        textAlign: 'center',
        color: '#888',
        marginTop: 5,
    },
    ayahContainer: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    ayahText: {
        fontSize: 18,
        textAlign: 'right',
        color: '#444',
    },
    ayahNumber: {
        fontSize: 14,
        textAlign: 'left',
        color: '#888',
        marginTop: 5,
    },
    playButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        alignItems: 'center',
    },
    playButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#f0f0f0',
    },
});
export default StartreadingByPara
