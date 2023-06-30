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
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
 export default function Dashboard({navigation}){

   const [data,setData] = useState([]);
   const [increment ,setIncrement]=useState(0);

     const increase = () => {
       
      setIncrement(prevIncrement => prevIncrement + 1);

     }

   useFocusEffect(
      React.useCallback(() => {

        api.get(`https://api.pexels.com/v1/curated/?page=${increment}&per_page=20`,qs.stringify({

      }))
        .then(function (response) {
          setData(response.data.photos)
           })
            .catch(function (error) {
           });

     },[increment])
    );
//     const test=()=>{

// var total = 8000
// var pageSize = 1000

// for (var i=1;i<(total/pageSize +1); i++){
//     console.log(i)
//    ` https://api.pexels.com/v1/curated/?page=${i}&per_page=15`
// }
//     }

return(
    <View style={styles.container}>
    <View style={styles.HeaderView}>
      <TouchableOpacity  onPress={() => test()}>
      <Text style={{color:'white',fontSize:hp('1.60'),marginLeft:wp('4')}}>WALLX</Text>
      </TouchableOpacity>
      <MaterialIcon name="magnify" size={hp('2.50%')} color="white" style={styles.materialSearch} />
    </View>
      <FlatList
             showsVerticalScrollIndicator={false}
        numColumns={2}
             data={data}
             onEndReached={increase} // Triggered when the user reaches the end of the list
             onEndReachedThreshold={0.5}
             style={{backgroundColor:'gray',width:wp('99')}}
             renderItem={({item}) =>
           <>
           <CardView
          cornerRadius={5}
             style={styles.item}>
                <Image source={{uri : item.src.portrait}} style={{height : hp('27%'),borderRadius:5,width : wp('90%')}} resizeMode="cover" />
                {/*<Text style={{fontSize:hp('1.70'),letterSpacing:wp('.10%'),minWidth:wp('15'),marginTop:hp('2'),fontWeight:'400',color:'black'}}>{item.photographer}</Text>*/}

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
      backgroundColor :'gray'
   },
   HeaderView:{
    width:wp('100'),
    height:hp('8'),
    flexDirection:'row',
    backgroundColor:'black',
    justifyContent:'space-between',
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
   materialSearch: {
    marginRight: wp('4')
 },
});