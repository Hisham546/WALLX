import React, { useEffect,useRef,useState } from "react";

import {
View,
Image,
Text,Button,ImageBackground,
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
  import { Dropdown } from 'react-native-element-dropdown';
  import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
 export default function Dashboard({navigation}){

   const [data,setData] = useState([]);
   const [increment ,setIncrement]=useState(0);
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
     const increase = () => {
       
      setIncrement(prevIncrement => prevIncrement + 1);

     }

      const dropdownData = [
         { label: 'Item 1', value: '1' },
         { label: 'Item 2', value: '2' },
         { label: 'Item 3', value: '3' },
         { label: 'Item 4', value: '4' },
         { label: 'Item 5', value: '5' },
         { label: 'Item 6', value: '6' },
         { label: 'Item 7', value: '7' },
         { label: 'Item 8', value: '8' },
       ];

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
console.log(data)
return(
    <View style={styles.container}>
    <View style={styles.HeaderView}>
      <TouchableOpacity>
      <Text style={{color:'white',fontSize:hp('1.60'),marginLeft:wp('4'),fontFamily:'Manrope-Bold'}}>WALLX</Text>
      </TouchableOpacity>
      <MaterialIcon name="magnify" size={hp('2.50%')} color="white" style={styles.materialSearch} />
         <Menu
               visible={visible}
                anchor={ <TouchableOpacity activeOpacity={1} onPress={showMenu}>
                            <MaterialIcon name="dots-vertical" size={hp('2.50%')} color="white" style={{marginRight: wp('3')}} />
                          </TouchableOpacity>}
                onRequestClose={hideMenu}>

                <MenuItem textStyle ={{color:'black',fontFamily:'Manrope-Medium'}} onPress={() => navigation.navigate('Favourite')}>Favourites</MenuItem>
                <MenuItem  textStyle ={{color:'black',fontFamily:'Manrope-Medium'}} onPress={hideMenu}>About</MenuItem>

          </Menu>
    </View>
      <FlatList
             showsVerticalScrollIndicator={false}
        numColumns={2}
             data={data}
             onEndReached={increase} // Triggered when the user reaches the end of the list
             onEndReachedThreshold={0.5}
             style={{backgroundColor:'#080202',width:wp('99')}}
             renderItem={({item}) =>
           <>
           <CardView
          cornerRadius={5}
             style={styles.item}>
              <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("ViewWallpaper",{data:item}) }>
                <ImageBackground source={{uri : item.src.portrait}} style={{height : hp('27%'),borderRadius:5,width : wp('90%')}} resizeMode="cover" />
                {/*<Text style={{fontSize:hp('1.70'),letterSpacing:wp('.10%'),minWidth:wp('15'),marginTop:hp('2'),fontWeight:'400',color:'black'}}>{item.photographer}</Text>*/}
                </TouchableOpacity>
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
      backgroundColor :'#080202'
   },
   HeaderView:{
    width:wp('100'),
    height:hp('8'),
    flexDirection:'row',
    backgroundColor:'#080202',
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
    marginLeft: wp('64')
 },

});