import React, { useEffect, useRef, useState,useContext } from "react";

import {
   View,
   Image,
   Text, Button, ImageBackground,
   StyleSheet, TouchableOpacity, FlatList,
   TextInput
}
   from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import api, { curatedData } from '../../api/axios';
import qs from 'qs';
import axios from 'axios';
import { useFocusEffect } from "@react-navigation/native";
import CardView from 'react-native-cardview'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { Context } from "../../state/context";

export default function Dashboard({ navigation: { goBack }, navigation }) {

   const [data, setData] = useState([]);
   const [searchData, setSearchData] = useState('');
   const [filteredData, setFilteredData] = useState('');
   const [pressedSearch, setPressedSearch] = useState(false);
   const [increment, setIncrement] = useState(0);

   const [nextPage, setNextPage] = useState(false);


   const [visible, setVisible] = useState(false);

   const hideMenu = () => setVisible(false);

   const { theme } = useContext(Context);
   function dropdownCheck(number) {
      if (number == '1') {
         navigation.navigate('Favourite')
         setVisible(false);
      }
      else if (number == '2') {
         navigation.navigate('Settings')
         setVisible(false);
      }
      else {
         navigation.navigate('About')
         setVisible(false);
      }

   }

   const showMenu = () => setVisible(true);


   const increase = () => {

      setIncrement(prevIncrement => prevIncrement + 1);

   }


   useFocusEffect(
      React.useCallback(() => {
         api.get(`https://api.pexels.com/v1/curated/?page=${increment}&per_page=30`)

            .then(function (response) {
               setData(response.data.photos)
            })
            .catch(function (error) {
            });

      }, [increment])
   );
   //    handleShow = (event) => {
   //        if (event.nativeEvent.contentOffset.y > 10 * hp('50')) {
   //              setNextPage(true);
   //        } else {
   //            setNextPage(false);
   //        }
   //    }

   const onSearch = (searchQuery) => {
      setFilteredData(searchQuery)
      api.get(`https://api.pexels.com/v1/search?query=${searchQuery}&per_page=5`)
         .then(function (response) {

            setSearchData(response.data.photos)
         })
         .catch(function (error) {
         });
   }
   function resetSearch() {

      setFilteredData('')
      setPressedSearch(false)

   }
   return (
      <View style={[styles.container,{  backgroundColor :theme === 'white' ? 'white' : '#080202' }]}>
         <View style={styles.HeaderView}>
            {pressedSearch != true ?
               <Text style={{ color: 'white', fontSize: hp('1.60'), marginLeft: wp('4'), fontFamily: 'Manrope-Bold' }}>WALLX</Text>
               : null}
            {pressedSearch != true ?
               <TouchableOpacity activeOpacity={1} style={{ marginLeft: wp('50') }} onPress={() => setPressedSearch(true)}>
                  <MaterialIcon name="magnify" size={hp('2.50%')} color="white" />
               </TouchableOpacity>
               : null}
            {pressedSearch === true ?
               <View style={styles.searchView}>
                  <TouchableOpacity activeOpacity={1} onPress={() => resetSearch()}>
                     <MaterialIcon name="arrow-left" size={hp('2.50%')} color="black" style={styles.materialSearch} />
                  </TouchableOpacity>
                  <TextInput
                     style={styles.searchProducts}
                     onChangeText={text => onSearch(text)}
                     value={filteredData}
                     placeholderTextColor={'gray'}
                     placeholder={'search wallpapers'}
                  />
               </View>
               : null}
            <Menu
               visible={visible}
               style={styles.menuStyle}
               anchor={
                  <TouchableOpacity activeOpacity={1} style={{ marginRight: wp('2'), width: wp('8'), justifyContent: 'center', alignItems: 'center', height: hp('5') }} onPress={showMenu}>
                     <MaterialIcon name={'dots-vertical'} size={hp('2.50%')} color={'white'} />
                  </TouchableOpacity>
               }
               onRequestClose={hideMenu}>
               <MenuItem textStyle={styles.menuTextStyle} onPress={() => dropdownCheck('1')}>Favourites</MenuItem>
               <MenuItem textStyle={styles.menuTextStyle} onPress={() => dropdownCheck('2')}>Settings</MenuItem>
               <MenuItem textStyle={styles.menuTextStyle} onPress={() => dropdownCheck('3')}>About</MenuItem>
            </Menu>
         </View>
         <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={filteredData.length > 0 ? searchData : data}
            onEndReached={increase} // Triggered when the user reaches the end of the list
            onEndReachedThreshold={0.2}
            style={{ width: wp('99'),  backgroundColor :theme === 'white' ? 'white' : '#080202'  }}
            renderItem={({ item }) =>
               <>
                  <CardView
                     cornerRadius={5}
                     style={styles.item}>
                     <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("ViewWallpaper", { data: item })}>
                        <ImageBackground source={{ uri: item.src.portrait }} style={{ height: hp('27%'), borderRadius: 5, width: wp('90%') }} resizeMode="cover" />
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

   container: {
      flex: 1,
      backgroundColor: '#080202'
   },
   HeaderView: {
      width: wp('100'),
      height: hp('8'),
      flexDirection: 'row',
      backgroundColor: '#080202',
      justifyContent: 'space-between',
      alignItems: 'center',



   },
   item: {
      height: hp('27%'),
      width: wp(' 50%'),
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.9,
      shadowRadius: 3,
      elevation: 6,
      marginRight: wp('1'),

      marginTop: hp('.80%'),
      marginBottom: hp('.50')
   },
   materialSearch: {
      marginLeft: wp('84')
   },
   menuStyle: {
      backgroundColor: 'white',
      marginLeft: wp('.85'),

      width: wp('35')

   },
   menuTextStyle: {
      color: 'black',
      fontSize: hp('1.50'),
      fontFamily: 'Manrope-Regular'

   },
   searchProducts: {
      color: 'black',
      width: wp('95'),
      marginLeft: wp('3'),
      fontSize: hp('1.60'),
      fontFamily: 'Manrope-Regular-Regular'
   },
   searchView: {
      height: hp('5%'),
      width: wp('90%'),
      backgroundColor: '#E8F6EF',
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: hp('.50')
   },
   materialSearch: {
      marginLeft: wp('4')
   },
});