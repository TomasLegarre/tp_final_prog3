import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Component } from 'react';
import homeScreen from '../screens/HomeScreen/homeScreen';
import newPost from '../screens/NewPost/newPost'
import Profile from '../screens/Profile/Profile'

const Tab = createBottomTabNavigator();


class HomeMenu extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={homeScreen}  options={{headerShown: false}} />
                <Tab.Screen name="New Post" component={newPost}  options={{headerShown: false}} />
                <Tab.Screen name="Profile" component={Profile}  options={{headerShown: false}} />
            </Tab.Navigator>
        )
    }
}

export default HomeMenu;