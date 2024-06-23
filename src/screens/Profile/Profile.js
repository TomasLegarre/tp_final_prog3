import React, { Component } from 'react';
import { db, auth } from '../../config/config';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Posteo from '../../Componentes/Posteo';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuarioInfo: [],
            userPosts: [],
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
                    loader: false
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
                console.log("alpiste usuario borrado");
                this.props.navigation.navigate("Register");
            })
            .catch((error) => {
                console.log("alpisten't no se pudo borrar", error);
            });
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
    
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={() => this.borrarUser(this.state.usuarioInfo[0]?.id)}
                    >
                        <Text style={styles.logoutText}>Borrar el usuario</Text>
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
        backgroundColor: '#141414', 
    },
    profileContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: '#000',
        borderRadius: 10,
        alignItems: 'center',
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', 
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 10,
    },
    bio: {
        fontSize: 16,
        color: '#fff', 
        marginBottom: 20,
        textAlign: 'center',
    },
    logoutButton: {
        padding: 10,
        backgroundColor: '#e50914', 
        borderRadius: 5,
        alignItems: 'center',
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
    },
    textoFino: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 10,
    },
    posts: {
        marginVertical: 10,
    },
});

export default Profile;
