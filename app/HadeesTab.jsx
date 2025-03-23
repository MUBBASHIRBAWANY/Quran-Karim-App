import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from "react-native";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [activeTab, setActiveTab] = useState('Arabic');
  const [selectedValue, setSelectedValue] = useState('sahih-bukhari');
  const [hadisdata , setHadisData] = useState([])
  
  const haditsBooks = [
    {
        book: 'Sahih Bukhari',
        name: 'sahih-bukhari',
    }, {
        book: 'Sahih Muslim',
        name: 'sahih-muslim',
    }, {
        book: 'Sunan Ibn Majah',
        name: 'ibn-e-majah',
    }, {
        book: 'Sunan Al-Tirmidhi',
        name: 'al-tirmidhi',
    }, {
        book: 'Sunan An-Nasa`i',
        name: 'sunan-nasai',
    }, {
        book: 'Mishkat Al-Masabih',
        name: 'mishkat',
    }, {
        book: 'Sunan Abu Dawood',
        name: 'abu-dawood',
    }
     

]
const getHadis = async (data)=>{
         
    let check = data?.hadiths
    check = check == undefined ? 1 : data?.hadiths
    console.log(selectedValue, check)
        try{
            const data1 = await axios?.get(`https://hadithapi.com/public/api/hadiths?apiKey=$2y$10$xJ8cVoe039dGq7ws4DQZaeFvT4ApvltBRAXmo353L63klH06VZvq&hadithNumber=${check}&book=${selectedValue}`)
            setHadisData(data1.data.hadiths.data)
            
        }
        catch(error){
            console.log(error)
            setHadisData("")

        }
        
        
    }

    useEffect(()=>{
        getHadis()
    },[])
  return (
    <SafeAreaView style={styles.container}>
        <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        style={styles.picker}
      >
        {haditsBooks.map((book, index) => (
          <Picker.Item label={book.book} value={book.name} key={index} />
        ))}
      </Picker>
      <View style={styles.fl}>
        <Controller
          control={control}
          name="hadiths"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              value={value}
              placeholder={'Enter Hadiths Number'}
            />
          )}
        />
        <TouchableOpacity onPress={handleSubmit(getHadis)}>
          <Text style={styles.Tex1}>Search</Text>
        </TouchableOpacity>
      </View>

<View style={styles.tabContainer}>
         <TouchableOpacity
           style={[styles.tab, activeTab === 'Arabic' && styles.activeTab]}
          onPress={() => setActiveTab('Arabic')}>
          <Text style={styles.textChange}>Arabic</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Urdu' && styles.activeTab]}
           onPress={() => setActiveTab('Urdu')}>
          <Text style={styles.textChange}>Urdu</Text>
         </TouchableOpacity> 
          <TouchableOpacity
          style={[styles.tab, activeTab === 'English' && styles.activeTab]}
           onPress={() => setActiveTab('English')}>
          <Text style={styles.textChange}>English</Text>
         </TouchableOpacity>
         
       </View>
       {activeTab === 'Arabic' ?
        <FlatList
        data={hadisdata}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.heading}>{item.headingArabic}</Text>
            <Text style={[styles.hadithText, { textAlign: 'right' }]}>{item.hadithArabic}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      /> : null
}
{
    activeTab === 'Urdu'?
    <FlatList
    data={hadisdata}
    renderItem={({ item }) => (
      <View style={styles.card}>
        <Text style={styles.heading}>{item.headingUrdu}</Text>
        <Text style={styles.narrator}>{item.urduNarrator}</Text>
        <Text style={[styles.hadithText, { textAlign: 'right' }]}>{item.hadithUrdu}</Text>
      </View>
    )}
    keyExtractor={(item) => item.id.toString()}
    contentContainerStyle={styles.listContent}
  /> : null
}

{
    activeTab === 'English'?
    <FlatList
    data={hadisdata}
    renderItem={({ item }) => (
      <View style={styles.card}>
        <Text style={styles.heading}>{item.headingEnglish}</Text>
        <Text style={[styles.hadithText, { textAlign: 'right' }]}>{item.hadithEnglish}</Text>
      </View>
    )}
    keyExtractor={(item) => item.id.toString()}
    contentContainerStyle={styles.listContent}
  /> : null
}
       </SafeAreaView>
       
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 60,
  },
  signInText: {
    fontSize: 26,
    color: 'black',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: 'black',
    justifyContent: 'space-around',
    padding: 10,
    borderRadius: 10,
    marginTop: 20
  },
  textChange: {
    textAlign: 'center',
    color: 'white',
  },
  tab: {
    padding: 10,
    width: '30%',
    borderRadius: 10,
  },
  activeTab: {
     backgroundColor: "brown"
  },
  input: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#e3f2fd',
    marginTop: 10,
  },
  label: {
    marginTop: 20,
    color: 'black'
  },
  forgotPassword: {
    fontSize: 12,
    color: '#42a5f5',
    marginBottom: 10,
  },
  signInButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
  },
  fl: {
    flexDirection: 'row',
    alignItems: 'center',
    objectFit: "contain",
    marginBottom: 16,
},
picker: {
    height: 50,
    width: '90%',
    marginLeft: 22,
    marginTop: 10,
    backgroundColor: 'rgb(200, 250, 250)'
},
input: {
    borderWidth: 1,
    marginTop: "10px",
    marginLeft: 22,
    borderColor: '#ddd',
    padding: 10,
    marginTop: 10,
    shadowColor: '#000',
    borderRadius: 6,
    fontSize: 16,
    width: '60%',
    height: 50
},
Tex1: {
    color: 'white',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 15,
    marginLeft: 20,
    marginRight: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15, fontWeight: 'bold', fontSize: 18,
    backgroundColor: 'rgb(84, 24, 50)',
    width: "70%"
},

  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  narrator: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666666',
    marginBottom: 8,
  },
  hadithText: {
    fontSize: 16,
    color: '#444444',
    lineHeight: 24,
  },
});