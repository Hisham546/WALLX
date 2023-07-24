import React, { useEffect,useRef,useState } from "react";

import {
View,
Image,Switch,
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


export default function  Settings({navigation}){

const test=() => {
let person = {
    firstName: 'John',
    lastName: 'Doe'
};

console.log(person['firstName']);
console.log(person['lastName']);

}
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
return(


<View style={styles.mainContainer}>
       <View style={styles.HeaderView}>
           <TouchableOpacity style={{marginLeft:wp('2')}}  onPress={() => navigation.navigate('Dashboard')}>
              <MaterialIcon name="arrow-left" size={hp('3.20%')} color="white" style={{marginRight: wp('3')}} />
           </TouchableOpacity>
             <Text style={{color:'white',fontSize:hp('2'),marginLeft:wp('8'),fontFamily:'Manrope-Bold'}}>Settings</Text>
       </View>
       <View style ={styles.contentView}>
         <Text style={{color:'white',fontSize:hp('1.8'),marginLeft:wp('5'),marginTop:hp('1'),fontFamily:'Manrope-Regular'}}>Appearance</Text>

         <View style ={styles.featuresView}>
                  <Text style={{color:'white',fontSize:hp('1.8'),marginLeft:wp('5'),marginTop:hp('1'),fontFamily:'Manrope-Regular'}}>Dark Mode</Text>

 <Switch style={styles.switchRight}
                     trackColor={{ false: "silver", true: "black" }}
                     thumbColor={isEnabled ? "rgba(255, 179, 32, 1)" : "#FDD36A"}

                     onValueChange={value => toggleSwitch(value)}
                     value={isEnabled}
                  />
                </View>
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
   contentView:{
   width:wp('100'),
   height:hp('80'),
   borderBottomWidth:wp('.3'),
     borderTopWidth:wp('.3'),
   borderColor:'gray'


   },
   featuresView:{
       width:wp('100'),
       height:hp('10'),
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'space-between'

   },
   switchRight: {
     minWidth: wp('19%'),
     height: hp('3.95%'),
     marginRight: wp('4%'),
     justifyContent: 'center',
     alignItems: 'center',
     flexDirection: 'row'
   },

})