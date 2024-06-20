import React, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Camara } from '../../Componentes/Camara';

class nuevoPosteo extends Component {
    constructor() {
        super();
        this.state = {
            post: '',
            imageURL: '',
            posted: false
        };
        console.log(this.state);
    }

    crearPosteo(owner, post, imageURL, createdAt) {
        if (post !== '') {
            db.collection('posts').add({
                owner: owner,
                post: post,
                imageURL: imageURL,
                createdAt: createdAt,
                likes: [],
                comments: []
            })
            .then(res => {
                console.log(res);
                this.setState({ posted: true });
            })
            .then(() => {
                if (this.state.posted) {
                    this.setState({ post: '', imageURL: '' });
                }
            })
            .catch(e => console.log(e));
        }
    }

    udpateImg(url) {
        this.setState({ imageURL: url });
    }

    render() {
        return (
            <View>
                <View style={styles.formContainer}>
                    {this.state.imageURL === '' ? (
                        <Camara actualizarimg={(url) => this.udpateImg(url)} />
                    ) : (
                        <View>
                            <Text>Crea una nueva publicación</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => this.setState({ post: text })}
                                placeholder='Agrega un pie de imagen'
                                keyboardType='default'
                                value={this.state.post}
                            />
                        </View>
                    )}
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this.crearPosteo(auth.currentUser.email, this.state.post, this.state.imageURL, Date.now())}>
                    <Text style={styles.textButton}>Publicar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    formContainer: {
        paddingHorizontal: 10,
        marginTop: 20,
    },
    botoncitos: {
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#E0E0E0',
        borderStyle: 'solid',
        borderRadius: 10,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#846C5B',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#443742'
    },
    textButton: {
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
    comentariosHome: {
        display: 'flex',
        flexDirection: 'row',
    },
    delete: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    }
});

export default nuevoPosteo;