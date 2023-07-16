import React, { useEffect,useRef,useState } from "react";

import {
View,
Image,
Text,Button,ImageBackground,
StyleSheet,TouchableOpacity,FlatList,
TextInput}
from "react-native";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import qs from 'qs';
import axios from 'axios';
import { useFocusEffect } from "@react-navigation/native";
import CardView from 'react-native-cardview'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function  About({navigation}){

return(


<View style={styles.mainContainer}>
       <View style={styles.HeaderView}>
           <TouchableOpacity style={{marginLeft:wp('2')}}  onPress={() => navigation.navigate('Dashboard')}>
              <MaterialIcon name="arrow-left" size={hp('3.20%')} color="white" style={{marginRight: wp('3')}} />
           </TouchableOpacity>
             <Text style={{color:'white',fontSize:hp('2'),marginLeft:wp('8'),fontFamily:'Manrope-Bold'}}>About</Text>
       </View>

   <View style={styles.firstView}>
         <Text style={{color:'white',fontSize:hp('2'),fontFamily:'Manrope-Bold'}}>WALLX</Text>

               <Text style={{color:'white',fontSize:hp('2'),marginTop:hp('2'),fontFamily:'Manrope-Bold'}}>Developed by</Text>
                   <Text style={{color:'white',fontSize:hp('2'),marginTop:hp('2'),fontFamily:'Manrope-Bold'}}>Hisham</Text>
   </View>

 </View>


)




}

const styles= StyleSheet.create({

    mainContainer:{
        flex:1,
        backgroundColor :'#080202'
     },

   HeaderView:{
    width:wp('100'),
    height:hp('8'),
    flexDirection:'row',
    backgroundColor:'#080202',
    alignItems:'center'

   },
  firstView:{
  marginTop:hp('15'),
  width:wp('100'),
  height:hp('30'),
  justifyContent:'center',
  alignItems:'center'


  }

})