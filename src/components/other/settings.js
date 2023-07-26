import React, { useEffect,useRef,useState } from "react";

import {
View,
Image,Switch,
Text,Button,ImageBackground,
StyleSheet,TouchableOpacity,FlatList,
TextInput,useColorScheme }
from "react-native";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import qs from 'qs';
import axios from 'axios';
import { useFocusEffect } from "@react-navigation/native";
import CardView from 'react-native-cardview'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function  Settings({navigation}){

  const [isEnabled, setIsEnabled] = useState(false);
 // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
 const colorScheme = useColorScheme();
 const [color,setColor]=useState('dark')


//console.log(colorScheme)

   const toggleSwitch = (val) => {
   setIsEnabled(previousState => !previousState)
   if(val === true){
   setColor('white')
// console.log(val,'val..')
//  console.log(color,'color..')
  }else{
    setColor('dark')
  }
   };







return(


<View style={[styles.mainContainer,{  backgroundColor :color === 'white' ? 'white' : '#080202' }]}>
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
                     trackColor={{ false: "silver", true: "#A0C49D" }}
                     thumbColor={isEnabled ? "#557A46" : "white"}
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
//        backgroundColor :'#080202'
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
 //  borderBottomWidth:wp('.3'),
   //  borderTopWidth:wp('.3'),
  // borderColor:'gray'


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