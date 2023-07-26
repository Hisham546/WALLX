import React, { useEffect, useRef, useState, useContext } from "react";

import {
  View,
  Image,
  Text, Button, PermissionsAndroid,
  StyleSheet, TouchableOpacity, FlatList, ImageBackground,
  TextInput
}
  from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { useFocusEffect } from "@react-navigation/native";
import CardView from 'react-native-cardview'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeModules } from 'react-native';
import ActionSheet from "react-native-actions-sheet";
import RNFetchBlob from 'rn-fetch-blob';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import Toast from "react-native-simple-toast";
import Snackbar from 'react-native-snackbar';
import RBSheet from "react-native-raw-bottom-sheet";
import { Context } from "../../state/context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import WallPaperManager from "react-native-set-wallpaper";
export default function ViewWallpaper({ route, navigation }) {

  const { value, updateValue } = useContext(Context);
  const actionSheetRef = useRef();
  const wallpaper = route.params.data;
  const [download, setDownload] = useState(wallpaper.src.portrait);
  const [loading, setLoading] = useState(false);
  //console.log(wallpaper)

  const applyWallpaper = (image) => {
    WallPaperManager.setWallpaper({ uri: image }, (res) => {
      //   console.log(res);
      Snackbar.show({
        text: 'Wallpaper applied successfully !',
        backgroundColor: 'white',
        textColor: 'black',
        duration: Snackbar.LENGTH_SHORT,
      });
    });
  };


  const addToFavourites = (image) => {
    const value = {
      photographer: image,
    };

    updateValue(value);
    storeFavourite(value)
    Snackbar.show({
      text: 'Added to favourites',
      backgroundColor: 'white',
      textColor: 'black',
      duration: Snackbar.LENGTH_SHORT,
    });

  };



  const storeFavourite = async (value) => {

    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('favourites', jsonValue);
    } catch (e) {
      // saving error
    }
  };
  const seeInformation = () => {
    actionSheetRef.current.open();
  }

  checkPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadWallpaper();
      } else {
        Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
      }
    } catch (err) {
    }
  }
  downloadWallpaper = () => {
    Snackbar.show({
      text: 'Downloading..',
      backgroundColor: 'white',
      textColor: 'black',
      duration: Snackbar.LENGTH_SHORT,
    });
    const { dirs } = RNFetchBlob.fs;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `wallpaper.jpg`,
        path: `${dirs.DownloadDir}/wallpaper.jpg`,
      },
    })
      .fetch('GET', download, {})
      .then((res) => {
        Snackbar.show({
          text: 'Download completed',
          backgroundColor: 'white',
          textColor: 'black',
          duration: Snackbar.LENGTH_SHORT,
        });

      })
      .catch((e) => {
      });
  }

  const MyAccount = () => {
    return (

      <View style={{ width: wp('100'), height: hp('25') }}>
        <Text style={{ fontSize: hp('2'), color: 'white', marginLeft: wp('5'), marginTop: hp('1.5'), fontFamily: 'Manrope-Bold' }}>Info</Text>
        <View style={{ width: wp('100%'), height: hp('20%'), flexDirection: 'row' }}>
          <View style={{ width: wp('50'), height: hp('12'), marginLeft: wp('4'), marginTop: hp('4'), justifyContent: 'space-between' }}>
            <Text style={{ fontSize: hp('1.90'), color: 'white', marginLeft: wp('3'), fontFamily: 'Manrope-Medium' }}>Photographer</Text>
            <Text style={{ fontSize: hp('1.90'), color: 'white', marginLeft: wp('3'), fontFamily: 'Manrope-Medium' }}>Width</Text>
            <Text style={{ fontSize: hp('1.90'), color: 'white', marginLeft: wp('3'), fontFamily: 'Manrope-Medium' }}>Height</Text>
          </View>
          <View style={{ width: wp('50'), height: hp('12'), marginLeft: wp('4'), justifyContent: 'space-between', marginTop: hp('4'), }}>
            <Text style={{ fontSize: hp('1.90'), color: 'white', marginLeft: wp('3'), fontFamily: 'Manrope-Medium' }}>{wallpaper.photographer}</Text>
            <Text style={{ fontSize: hp('1.90'), color: 'white', marginLeft: wp('3'), fontFamily: 'Manrope-Medium' }}>{wallpaper.width}</Text>
            <Text style={{ fontSize: hp('1.90'), color: 'white', marginLeft: wp('3'), fontFamily: 'Manrope-Medium' }}>{wallpaper.height}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>

      <ImageBackground source={{ uri: wallpaper.src.portrait }} style={{ height: hp('100%'), justifyContent: 'space-between', width: wp('100%') }} resizeMode="cover">
        <View style={{ width: wp('100'), height: hp('7'), alignItems: 'center', flexDirection: 'row' }}>
          <TouchableOpacity style={{ marginLeft: wp('3.9'), width: wp('8'), justifyContent: 'center', height: hp('4') }} onPress={() => navigation.navigate('Dashboard')}>
            <MaterialIcon name="arrow-left" size={hp('3.20%')} color="white" />
          </TouchableOpacity>
          {/*<Text style={{ fontSize: hp('1.90'),color:'white',marginLeft:wp('3'),fontFamily: 'Manrope-Medium'}}>{wallpaper.alt}</Text>*/}
        </View>
        <View style={styles.iconView}>
          <TouchableOpacity onPress={() => seeInformation()}>
            <MaterialIcon name="information-outline" size={hp('2.65%')} color="white" style={styles.materialSearch} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => checkPermission()}>
            <MaterialIcon name="arrow-collapse-down" size={hp('2.65%')} color="white" style={styles.materialSearch} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => applyWallpaper(wallpaper.src.portrait)}>
            <MaterialIcon name="inbox-arrow-up" size={hp('2.65%')} color="white" style={styles.materialSearch} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addToFavourites(wallpaper.src.portrait)}>
            <MaterialIcon name="cards-heart-outline" size={hp('2.65%')} color="white" style={styles.materialSearch} />
          </TouchableOpacity>
          {/*cards-heart*/}
        </View>
      </ImageBackground>

      <RBSheet
        ref={actionSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType={'fade'}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          container: {
            backgroundColor: '#20262E'
          },
          draggableIcon: {
            backgroundColor: "#20262E"
          }
        }}
      >
        <MyAccount />
      </RBSheet>
    </View>

  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  iconView: {
    width: wp('100%'),
    height: hp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 7,
  },

  infoView: {
    height: hp('40'),
    width: wp('100'),
    backgroundColor: '#27374D',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,


  },
  spinnerView: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF88",
  },




})