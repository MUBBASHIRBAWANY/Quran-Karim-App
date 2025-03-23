import React from 'react'
import { View , StyleSheet, TouchableOpacity, Text} from 'react-native'

const StartReadingQuran = ({ navigation }) => {
  return (
    <View>
  <TouchableOpacity onPress={() => navigation.navigate("Start Reading By Surah")} style={{ marginBottom: 20 }}>
    <View>
      <Text style={styles.start}>
      Start Reading By Surah
      </Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Start Reading By Para")} >
    <View>
      <Text style={styles.start}>
      Start Reading By Para
      </Text>
    </View>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
})

export default StartReadingQuran
