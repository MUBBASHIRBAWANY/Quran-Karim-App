import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "../app/index";
import StartReadingQuran from '../app/StartReadingQuran'
import StartReadingBySurah from "@/app/StartReadingBySurah";
import StartReadingByPara from "@/app/StartreadingByPara";
import HadeesTab from '../app/HadeesTab'
// Screens




// Custom Drawer
const CustomDrawerContent = ({ navigation }) => (
  <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: "#ebf9fa" }}>
    <Text style={{ fontSize: 24, color: "272727", marginBottom: 20 }}>Menu</Text>

    <TouchableOpacity onPress={() => navigation.navigate("Quran Karim App")} style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 18, color: "272727" }}>🏠 Home</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate("Start Reading Quran")} style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 18, color: "272727" }}> Read Quran</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate("Hadees")} style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 18, color: "272727" }}> Read Hadees</Text>
    </TouchableOpacity>
  </SafeAreaView>
);

// Drawer Navigator
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: { backgroundColor: "#ENECEF", width: 240 },
        headerTintColor: "272727",
      }}
    >
      <Drawer.Screen name="Quran Karim App" component={HomeScreen} />
      <Drawer.Screen name="Start Reading By Surah" component={StartReadingBySurah} />
      <Drawer.Screen name="Start Reading By Para" component={StartReadingByPara} />
      <Drawer.Screen name="Start Reading Quran" component={StartReadingQuran} />
      <Drawer.Screen name="Hadees" component={HadeesTab} />




    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
