import React, { Component } from 'react';
import { db, auth } from '../../config/config';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import Posteo from '../../Componentes/Posteo';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: [],
            userPosts: [],
            userEmail: '',
            password: '',
            loading: true
        };
    }

    getData() {
        let user = auth.currentUser.email;
        db.collection("users").where('owner', '==', user)
            .onSnapshot((docs) => {
                let userInfo = [];
                docs.forEach((doc) => {
                    usuarioInfo.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                this.setState({
                    userInfo: userInfo,
                    userEmail: user,
                    loading: false
                });
                this.getPost(user);
            });
    }

    getPost(user) {
        db.collection("posts").where("owner", "==", user)
            .onSnapshot((docs) => {
                let getUserPost = [];
                docs.forEach((doc) => {
                    getUserPost.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                this.setState({
                    userPosts: getUserPost,
                    loading: false
                });
            });
    }

    logout() {
        auth.signOut();
        this.props.navigation.navigate('Login');
    }

    eliminarCuenta(){
        this.props.navigation.navigate('EliminarCuenta');
    }

    componentDidMount() {
        this.getData();
    }

    borrarUser(id) {
        const borrarUsuario = auth.currentUser;
        db.collection("users").doc(id).delete()
            .then(() => {
                return borrarUsuario.delete();
            })
            .then(() => {
                console.log("Usuario borrado correctamente");
                this.props.navigation.navigate("Register");
            })
            .catch((error) => {
                console.log("Error al borrar usuario", error);
            });
    }
    
    render() {
        return (
                <View style={styles.profileContainer}>
                    <Text style={styles.username}>{this.state.userInfo[0]?.data.username}</Text>
                    <Text style={styles.bio}>{this.state.userInfo[0]?.data.bio}</Text>
                    
                    <TouchableOpacity style={styles.logoutButton} onPress={() => this.logout()}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>

                    <Text style={styles.texto}>Posteos Realizados: {this.state.userPosts.length}</Text>
                
                    {this.state.userPosts.length === 0 ? (
                    <Text style={styles.textoFino}>Ups! No hiciste posteos</Text>
                    ) : (
                    <FlatList
                        data={this.state.userPosts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                        <Posteo
                            propsNav={this.props}
                            postInfo={item}
                            style={styles.posts}
                        />
                        )}
                    />
                    )}

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={() => this.borrarUser(this.state.userInfo[0]?.id)}
                    >
                        <Text style={styles.logoutText}>Borrar el usuario</Text>
                    </TouchableOpacity>
                </View>
        );
    }
}    

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    username: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff', 
        marginBottom: 10,
        textAlign: 'center',
    },
    bio: {
        fontSize: 18,
        color: '#fff', 
        marginBottom: 20,
        textAlign: 'center',
    },
    logoutButton: {
        padding: 10,
        backgroundColor: '#e50914', 
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    texto: {
        color: '#fff',
        fontSize: 18,
        marginVertical: 10,
        textAlign: 'center',
    },
    textoFino: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 10,
        textAlign: 'center',
    },
    posts: {
        marginVertical: 10,
        width: '100%',
    },
});

export default Profile;

