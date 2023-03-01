import React, { useEffect,useRef,useState } from "react";

import {
View,
Image,
Text,Button,
StyleSheet,TouchableOpacity,FlatList,
TextInput}
from "react-native";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import api, { curatedData } from '../../api/axios';
import qs from 'qs';
import axios from 'axios';
import { useFocusEffect } from "@react-navigation/native";
import CardView from 'react-native-cardview'

 export default function Dashboard({navigation}){
   const [data,setData] = useState([]);
   useFocusEffect(
      React.useCallback(() => {
        api.get(curatedData,qs.stringify({

      }))
        .then(function (response) {
   setData(response.data.photos)
                       console.log(response)

           })
            .catch(function (error) {
             console.log(error)
           });

     },[])
    );
    const test=(url)=>{

console.log(url)
    }

return(
    <View style={styles.container}>
    <View style={styles.HeaderView}>

    </View>
      <FlatList
             data={data}
             renderItem={({item}) =>
           <>

<CardView
         style={styles.item}>
                        <Image source={{uri : item.src.portrait}} style={{height : hp('14%'),width : wp('30%'),marginTop:hp('.50'),marginRight:wp('2')}} resizeMode="contain" />
                              <Text style={{fontSize:hp('1.70'),letterSpacing:wp('.10%'),minWidth:wp('15'),marginTop:hp('2'),fontWeight:'400',color:'black'}}>{item.photographer}</Text>
             </CardView>



         </>
                              }

             />


</View>

);


}
const styles = StyleSheet.create({

   container:{
      flex:1,
      backgroundColor :'white'
   },
   HeaderView:{
    width:wp('100'),
    height:hp('8'),
    backgroundColor:'gray',
    justifyContent:'center',


   },
   item: {
      height : hp('18%'),
      width : wp('63%'),
      backgroundColor:'white',
      borderRadius:4,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.9,
      shadowRadius: 3,
      elevation: 6,
      flexDirection:'row',

      marginLeft:wp('4%'),
      marginTop:hp('1%'),
      marginBottom:hp('1')
   },

});