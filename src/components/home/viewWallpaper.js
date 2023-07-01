import React, { useEffect,useRef,useState } from "react";

import {
View,
Image,
Text,Button,
StyleSheet,TouchableOpacity,FlatList,ImageBackground,
TextInput}
from "react-native";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'

import { useFocusEffect } from "@react-navigation/native";
import CardView from 'react-native-cardview'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import NativeModules from 'react-native';

export default function ViewWallpaper({route}) {

const wallpaper =route.params.data;
console.log(wallpaper)

const applyWallpaper = () => {
    NativeModules.MainApplication.setWallpaper(wallpaper.src.portrait);
  };
    return(
<View style={StyleSheet.mainContainer}>

<ImageBackground source={{uri: wallpaper.src.portrait}} style={{height: hp('100%'), justifyContent: 'flex-end', width: wp('100%')}} resizeMode="cover">
  <View style={styles.iconView}>
    <MaterialIcon name="information-outline" size={hp('2.65%')} color="white" style={styles.materialSearch} />
    <MaterialIcon name="arrow-collapse-down" size={hp('2.65%')} color="white" style={styles.materialSearch} />
    <TouchableOpacity  onPress={() => applyWallpaper()}>
    <MaterialIcon name="inbox-arrow-up" size={hp('2.65%')} color="white" style={styles.materialSearch} />
    </TouchableOpacity>
    <MaterialIcon name="cards-heart-outline" size={hp('2.65%')} color="white" style={styles.materialSearch} 
    /*cards-heart*//>
  </View> 
</ImageBackground> 


</View>

    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor :'white'
     },
     iconView: {
        width: wp('100%'), 
        height: hp('5%'),
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: 25,
        paddingVertical: 7,
      }




})