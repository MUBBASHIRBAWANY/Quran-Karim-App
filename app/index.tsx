// screens/HomeScreen.js
import { router } from 'expo-router';

import * as React from 'react';
import { View, Text, Button, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const image1 =  {uri: 'https://res.cloudinary.com/dmi26itgk/image/upload/v1741197392/quran-pak-mehroon_rmd82j.jpg'};
function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={image1} resizeMode="cover">
        <Text style={styles.text1}>فرمانِ آخری نبی   صَلَّی اللہُ  عَلَیْہِ وَاٰلِہٖ وَسَلَّمَ</Text>
        <Text style={styles.text2}> إنَّكم لا ترجِعون إلى اللهِ بشيءٍ أفضلَ ممَّا خرج منه يعني القرآنَ</Text>
        <Text style={styles.text3}>The Last Prophet Muhammad (s.a.w) said, “You will not come back to Allah with anything better than that which came from Him, i.e. the Qur’an.”</Text>
        <Text style={styles.text3}>Source: Mastadrik al-Hakim no. 2077 </Text>
      </ImageBackground>
      <TouchableOpacity onPress={() => navigation.navigate("Start Reading Quran")}>
    <View>
      <Text style={styles.start}>
        Start Readiing Quran
      </Text>
    </View>
    </TouchableOpacity><TouchableOpacity onPress={() => navigation.navigate("Hadees")}>
    <View>
      <Text style={styles.start}>
        Start Readiing Hadees
      </Text>
    </View>
    </TouchableOpacity>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20

  },
  start :{
    margin : 20,
    borderTopLeftRadius: 55,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 55,
    padding: 20,
    textAlign : 'center',
    color : 'rgb(222, 206, 116)',
    backgroundColor : 'rgb(84, 24, 50)'
  },

  text1: {
    fontSize: 20,
    marginLeft: "10%",
    fontWeight: 'bold',
    marginBottom: 10,
    color : 'rgb(88, 28, 80)'
    
  },
  text2: {
    fontSize: 26,
    marginLeft: "10%",
    marginTop: 10,
    color : 'white'

  },
  text3: {
    fontSize: 20,
    fontWeight : "bold",
    color : 'white',
    alignItems: "center",
    margin: 20
  },
  Buton: {
    width: 20,
    flex: 1
  }
});

export default HomeScreen;