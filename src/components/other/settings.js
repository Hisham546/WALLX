import React, { useEffect,useState,useContext } from "react";

import {
View
,Switch,
Text,
StyleSheet,TouchableOpacity,FlatList,
TextInput,useColorScheme }
from "react-native";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Context } from "../../state/context";
export default function  Settings({navigation}){

  const [isEnabled, setIsEnabled] = useState(theme === "white"?  false: true);
 // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
 const colorScheme = useColorScheme();
 const [color,setColor]=useState('dark')

 const { theme,updateTheme } = useContext(Context);



   const toggleSwitch = (val) => {
 
    if(val === true){
      setIsEnabled(previousState => !previousState)
      updateTheme('white')

    }else{
      setIsEnabled(previousState => !previousState)
      updateTheme('dark')
    }
   };







return(


<View style={[styles.mainContainer,{  backgroundColor :theme === 'white' ? 'white' : '#080202' }]}>
       <View style={[styles.HeaderView,{  backgroundColor :theme === 'white' ? 'white' : '#080202' }]}>
           <TouchableOpacity style={{marginLeft:wp('2')}}  onPress={() => navigation.navigate('Dashboard')}>
              <MaterialIcon name="arrow-left" size={hp('3.20%')}  style={{marginRight: wp('3'),color :theme === 'white' ? 'black' : 'white',}} />
           </TouchableOpacity>
             <Text style={{color :theme === 'white' ? 'black' : 'white',fontSize:hp('2'),marginLeft:wp('8'),fontFamily:'Manrope-Bold'}}>Settings</Text>
       </View>
       <View style ={styles.contentView}>
         <Text style={{color :theme === 'white' ? 'black' : 'white',fontSize:hp('1.6'),marginLeft:wp('5'),marginTop:hp('1'),fontFamily:'Manrope-Regular'}}>Appearance</Text>

         <View style ={styles.featuresView}>
                  <Text style={{color :theme === 'white' ? 'black' : 'white',fontSize:hp('1.8'),marginLeft:wp('5'),marginTop:hp('1'),fontFamily:'Manrope-Regular'}}>Dark Mode</Text>

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
     },

   HeaderView:{
    width:wp('100'),
    height:hp('8'),
    flexDirection:'row',
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