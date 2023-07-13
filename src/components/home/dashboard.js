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

import Search from 'react-native-search-box';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
 export default function Dashboard({navigation}){

   const [data,setData] = useState([]);
   const [increment ,setIncrement]=useState(0);
  const [visible, setVisible] = useState(false);
  const [nextPage,setNextPage] = useState(false);



  const showMenu = () => setVisible(true);


     const increase = () => {
       
      setIncrement(prevIncrement => prevIncrement + 1);

     }


   useFocusEffect(
      React.useCallback(() => {
         api.get(`https://api.pexels.com/v1/curated/?page=${increment}&per_page=20`)

          .then(function (response) {
               setData(response.data.photos)
           })
             .catch(function (error) {
           });

     },[increment])
    );
    handleShow = (event) => {
        if (event.nativeEvent.contentOffset.y > 10 * hp('50')) {
              setNextPage(true);
        } else {
            setNextPage(false);
        }
    }
return(
    <View style={styles.container}>
    <View style={styles.HeaderView}>
      <TouchableOpacity>
      <Text style={{color:'white',fontSize:hp('1.60'),marginLeft:wp('4'),fontFamily:'Manrope-Bold'}}>WALLX</Text>
      </TouchableOpacity>
      <MaterialIcon name="magnify" size={hp('2.50%')} color="white" style={styles.materialSearch} />

        {/* <Menu
               visible={visible}
               style ={styles.menuStyle}
                anchor={
                <TouchableOpacity activeOpacity={1} onPress={showMenu}>
                   <MaterialIcon name="dots-vertical" size={hp('2.50%')} color="white" style={{marginRight: wp('3')}} />
                 </TouchableOpacity>}>
                <MenuItem textStyle ={styles.menuTextStyle} onPress={() => navigation.navigate('Favourite')}>Favourites</MenuItem>
                 <MenuItem  textStyle ={styles.menuTextStyle} onPress={() => navigation.navigate('Settings')}>Settings</MenuItem>
                <MenuItem  textStyle ={styles.menuTextStyle} onPress={() => navigation.navigate('About')}>About</MenuItem>
          </Menu>*/}
  <Menu>
   <MenuTrigger
       customStyles={{ triggerWrapper: { marginRight: 3 } }}>
          <MaterialIcon name="dots-vertical" size={hp('2.50%')} color="white" />
      </MenuTrigger>
       <MenuOptions style ={styles.menuStyle}>
         <MenuOption onSelect={() => navigation.navigate('Favourite')} >
              <Text style={styles.menuTextStyle}>Favourites</Text>
          </MenuOption>
          <MenuOption onSelect={() => navigation.navigate('Settings')} >
           <Text style={styles.menuTextStyle}>Settings</Text>
          </MenuOption>
          <MenuOption onSelect={() => navigation.navigate('About')} >
           <Text style={styles.menuTextStyle}>About</Text>
         </MenuOption>
       </MenuOptions>
  </Menu>
    </View>
      <FlatList
             showsVerticalScrollIndicator={false}
             numColumns={2}
             data={data}
             onEndReached={increase} // Triggered when the user reaches the end of the list
             onEndReachedThreshold={0.2}
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
 menuStyle:{
       backgroundColor :'white',
       marginLeft:wp('.85'),
       width:wp('17')

 },
 menuTextStyle:{
 color:'black',
 fontSize:hp('1.50'),
 fontFamily:'Manrope-Regular'

 }

});