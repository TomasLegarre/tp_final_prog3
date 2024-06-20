import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Component } from 'react';
import homeScreen from '../screens/HomeScreen/homeScreen';
// import newPost from '../screens/newPost/newPost';
import nuevoPosteo from '../screens/nuevoPosteo/nuevoPosteo';
import Profile from '../screens/Profile/Profile';
import {FontAwesome} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


class HomeMenu extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Tab.Navigator screenOptions={{tabBarShowLabel: false }}>
                <Tab.Screen name="Home" component={homeScreen}  options={{tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />}}/>
                {/* <Tab.Screen name="New Post" component={newPost}  options={{tabBarIcon: () => <AntDesign name="plussquare" size={24} color="black" />}} /> */}
                <Tab.Screen name="Nuevo Posteo" component={nuevoPosteo}  options={{tabBarIcon: () => <FontAwesome name="nuevoPosteo" size={24} color="black" />}}/>
                <Tab.Screen name="Profile" component={Profile}  options={{tabBarIcon: () => <MaterialIcons name="my-library-books" size={24} color="black" />}} />
            </Tab.Navigator>
        )
    }
}

export default HomeMenu;