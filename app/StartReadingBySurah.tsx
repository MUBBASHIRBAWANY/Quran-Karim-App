import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView,StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios'
import { Picker } from '@react-native-picker/picker';




const StartReading = () => {
  const [selectedValue, setSelectedValue] = useState(1);
  const [translation, setTranslation] = useState([])
const [surahData , setSurahData] = useState([])
const [allData, SetAllData] = useState([])
const [allSurah , setAllSurah] = useState([])
  const getSurah = async (value) =>{
    const res = await axios.get(`https://api.alquran.cloud/v1/surah/${value}/ar.alafasy`)
    const trans = await axios.get(`https://api.alquran.cloud/v1/surah/${value}/ur.ahmedali`)
    setTranslation(trans.data.data.ayahs)
    console.log(translation)
    const data = res.data.data.ayahs
    SetAllData(res.data)
    setSurahData(data)
  }
const getAllSurah = async () =>{
  const res = await axios.get("https://api.alquran.cloud/v1/surah")
    const data = res.data.data
    setAllSurah(data)
  
}

  useEffect(()=>{
    getSurah(selectedValue)
  },[selectedValue])

  useEffect(()=>{
    getAllSurah()
  },[])
  
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
        {allSurah.map((ayat, index)=>{
          return(
            <Picker.Item label={ayat.name} value={ayat.number} key={index}/>
          )
        })
        }
        {/* <Picker.Item label="Apple" value="apple" />
        <Picker.Item label="Banana" value="banana" />
        <Picker.Item label="Orange" value="orange" />
        <Picker.Item label="Mango" value="mango" /> */}
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
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => playAudio(ayah.audio)}
          >
            <Text style={styles.playButtonText}>Play Audio</Text>
          </TouchableOpacity>
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
export default StartReading
