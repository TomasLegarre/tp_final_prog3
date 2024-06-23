import react, { Component } from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
import homeScreen from '../screens/HomeScreen/homeScreen';
import Profile from '../screens/Profile/Profile'; 
import Comentarios from '../screens/Comentarios/comentarios';
import NoProfile from '../screens/NoProfile/NoProfile';


const Stack = createNativeStackNavigator();

class StackSecundaria extends Component {
    constructor(){
        super()
        this.state={
      
        }
    }
    
    render(){
        return(


            <Stack.Navigator>
              <Stack.Screen name='HomeScreen' component={homeScreen} options={{headerShown :false}}  />
              <Stack.Screen name='NoProfile' component={NoProfile} options={{headerShown :false}}  />
              <Stack.Screen name='Comentarios' component={Comentarios} options={{headerShown :false}}  />
            </Stack.Navigator>
    
        )
    }
}

export default StackSecundaria;
