import React, { useEffect,useRef,useState,useContext  } from "react";

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
import { Context } from "../../state/context";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Favourite({navigation}){
//const { value } = useContext(Context);
//  console.log(value,'wallpaper')

    const [data,setData]=useState('');

       useEffect(() => {

          getData()

        }, []);



        const getData = async () => {
          try {
            const value = await AsyncStorage.getItem('favourites');
                      console.log(value,'wallpaper')
            if (value !== null) {
                setData(value.photographer)

            }
          } catch (e) {
            // error reading value
          }
        };
console.log(data,'........data')
 return(

<View style={styles.mainContainer}>
    <View style={styles.HeaderView}>
              <TouchableOpacity style={{marginLeft:wp('2')}}  onPress={() => navigation.navigate('Dashboard')}>
               <MaterialIcon name="arrow-left" size={hp('3.20%')} color="white" style={{marginRight: wp('3')}} />
                 </TouchableOpacity>
      <Text style={{color:'white',fontSize:hp('2'),marginLeft:wp('8'),fontFamily:'Manrope-Bold'}}>Favourites</Text>

    </View>

  <CardView
              cornerRadius={5}
                 style={styles.item}>
                  <TouchableOpacity activeOpacity={1}  >
                 <Image
                 source={{uri : data}}
                  style={{height : hp('27%'),borderRadius:5,width : wp('90%')}} resizeMode="cover" />
                    </TouchableOpacity>
               </CardView>
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

      item: {
         height : hp('27%'),
         width : wp(' 50%'),
         backgroundColor:'white',
         borderRadius:8,
         shadowColor: '#000000',
         shadowOffset: { width: 0, height: 1 },
         shadowOpacity: 0.9,
         shadowRadius: 3,
         elevation: 6,
         marginRight:wp('1'),
         marginLeft: wp('1%'),
         marginTop:hp('.80%'),
         marginBottom:hp('.50')
      },


})