import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Component } from 'react';
import nuevoPosteo from '../screens/nuevoPosteo/nuevoPosteo';
import Profile from '../screens/Profile/Profile';
import {FontAwesome} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import StackSecundaria from './StackSecundaria';
import Buscador from "../Componentes/Buscador"

const Tab = createBottomTabNavigator();


class HomeMenu extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Tab.Navigator screenOptions={{tabBarShowLabel: false }}>
                <Tab.Screen name="HomeScreen" component={StackSecundaria}  options={{tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />}}/>
                <Tab.Screen name="Buscador" component={Buscador}  options={{tabBarIcon: () => <FontAwesome name="search" size={24} color="black" />}}/>
                <Tab.Screen name="Nuevo Posteo" component={nuevoPosteo}  options={{tabBarIcon: () => <MaterialIcons name="post-add" size={24} color="black" />}}/>
                <Tab.Screen name="Profile" component={Profile}  options={{tabBarIcon: () => <MaterialIcons name="my-library-books" size={24} color="black" />}} />
            </Tab.Navigator> 
        )
    }
}

export default HomeMenu; 