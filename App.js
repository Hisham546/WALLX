import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from './src/components/home/dashboard';
import ViewWallpaper from './src/components/home/viewWallpaper';
import Favourite from './src/components/features/favourite';
import {Provider} from './src/state/context';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
     <Provider>
    <NavigationContainer>
        <Stack.Navigator>
           <Stack.Screen
              options={{headerShown : false}}
              name="Dashboard"
              component={Dashboard} />
           <Stack.Screen
              options={{headerShown : false}}
              name="ViewWallpaper"
              component={ViewWallpaper} />
          <Stack.Screen
                options={{headerShown : false}}
                name="Favourite"
                component={Favourite} />
           </Stack.Navigator>        
     </NavigationContainer>
       </Provider>
  );
};

export default App;