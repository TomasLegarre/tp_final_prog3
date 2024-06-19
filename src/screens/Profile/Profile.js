import React, { Component } from 'react';
import { db, auth } from '../../config/config';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuarioInfo: [],
            usuarioPost: [],
            usuarioEmail: '',
            password: '',
            loader: true
        };
    }

    getData() {
        let user = auth.currentUser.email;
        db.collection("users").where('owner', '==', user)
            .onSnapshot((docs) => {
                let usuarioInfo = [];
                docs.forEach((doc) => {
                    usuarioInfo.push({
                        data: doc.data(),
                    });
                });
                this.setState({
                    usuarioInfo: usuarioInfo,
                    usuarioEmail: user,
                    loader: false
                });
                this.getPost(user);
            });
    }

    logout() {
        auth.signOut();
        this.props.navigation.navigate('Login');
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <Text style={styles.username}>{this.state.usuarioInfo[0]?.data.username}</Text>
                    <Text style={styles.email}>{this.state.usuarioInfo[0]?.data.owner}</Text>
                    <Text style={styles.bio}>{this.state.usuarioInfo[0]?.data.bio}</Text>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => this.logout()}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#141414', // Netflix background color
    },
    profileContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: '#000', // Black color for the container
        borderRadius: 10,
        alignItems: 'center',
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // White text
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        color: '#fff', // White text
        marginBottom: 10,
    },
    bio: {
        fontSize: 16,
        color: '#fff', // White text
        marginBottom: 20,
        textAlign: 'center',
    },
    logoutButton: {
        padding: 10,
        backgroundColor: '#e50914', // Netflix red color
        borderRadius: 5,
        alignItems: 'center',
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Profile;
