import React, { useEffect,useRef,useState } from "react";

import {
View,
Image,
Text,Button,PermissionsAndroid,
StyleSheet,TouchableOpacity,FlatList,ImageBackground,
TextInput}
from "react-native";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'

import { useFocusEffect } from "@react-navigation/native";
import CardView from 'react-native-cardview'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Favourite({navigation}){

 return(

<View style={styles.mainContainer}>
    <View style={styles.HeaderView}>
              <TouchableOpacity style={{marginLeft:wp('2')}}  onPress={() => navigation.navigate('Dashboard')}>
               <MaterialIcon name="arrow-left" size={hp('3.20%')} color="white" style={{marginRight: wp('3')}} />
                 </TouchableOpacity>
      <Text style={{color:'white',fontSize:hp('2'),marginLeft:wp('8'),fontFamily:'Manrope-Bold'}}>Favourites</Text>

    </View>

     {/* <CardView
              cornerRadius={5}
                 style={styles.item}>
                  <TouchableOpacity activeOpacity={1}  }>
                  {/*  <Image source={{uri : item.src.portrait}} style={{height : hp('27%'),borderRadius:5,width : wp('90%')}} resizeMode="cover" />
                    <Text style={{fontSize:hp('1.70'),letterSpacing:wp('.10%'),minWidth:wp('15'),marginTop:hp('2'),fontWeight:'400',color:'black'}}>{item.photographer}</Text>
                    </TouchableOpacity>
               </CardView>*/}
</View>










 )





}


const styles = StyleSheet.create({

    mainContainer:{
        flex:1,
        backgroundColor :'#2B2730'
     },
   HeaderView:{
    width:wp('100'),
    height:hp('8'),
    flexDirection:'row',
    backgroundColor:'#2B2730',
    alignItems:'center'


   },


})