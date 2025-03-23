import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "../components/DrawerNavigator"; // Import the sidebar


// Custom Sidebar Component
const RootLayout = () => {
  return (

    <DrawerNavigator />

  );
};

export default RootLayout;