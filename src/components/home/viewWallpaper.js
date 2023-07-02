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
import { NativeModules } from 'react-native';
import ActionSheet from "react-native-actions-sheet";

export default function ViewWallpaper({route}) {
  const actionSheetRef = useRef();
const wallpaper =route.params.data;

console.log(wallpaper)
const applyWallpaper = (image) => {
  NativeModules.MainApplication.setWallpaper(image);
  };


  const seeInformation = () => {
actionSheetRef.current?.show();
    }


  const MyAccount = () => {
    return (
      <View style={{ width: wp('100%'), height: hp('15%'), justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: hp('1.90'), color: 'black', fontFamily: 'Manrope-Bold' }}>hi</Text>
      </View>
    );
  };

    return(
<View style={StyleSheet.mainContainer}>

<ImageBackground source={{uri: wallpaper.src.portrait}} style={{height: hp('100%'), justifyContent: 'flex-end', width: wp('100%')}} resizeMode="cover">
  <View style={styles.iconView}>
  <TouchableOpacity  onPress={() => seeInformation()}>
    <MaterialIcon name="information-outline" size={hp('2.65%')} color="white" style={styles.materialSearch} />
    </TouchableOpacity>
    <MaterialIcon name="arrow-collapse-down" size={hp('2.65%')} color="white" style={styles.materialSearch} />
    <TouchableOpacity  onPress={() => applyWallpaper( wallpaper.src.portrait)}>
    <MaterialIcon name="inbox-arrow-up" size={hp('2.65%')} color="white" style={styles.materialSearch} />
    </TouchableOpacity>
    <MaterialIcon name="cards-heart-outline" size={hp('2.65%')} color="white" style={styles.materialSearch} 
    /*cards-heart*//>
  </View> 
</ImageBackground> 

  <ActionSheet ref={actionSheetRef}>
  <MyAccount />
    </ActionSheet>
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
      },

      infoView:{
      height:hp('40'),
      width:wp('100'),
      backgroundColor:'#27374D',
             borderTopLeftRadius: 0,
              borderTopRightRadius: 0,


      }




})