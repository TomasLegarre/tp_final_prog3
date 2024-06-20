import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { db, auth } from "../../config/config.js";
import Camara from '../../Componentes/Camara.js';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            error: '',
            imgPerfil: '',
            bio: '',
        };
    }

    onSubmit(name, email, password) {
        if (name === null || name === '' || name.length < 4) {
            this.setState({ error: 'El nombre de usuario debe ser mayor a 4 caracteres' });
            return false;
        }
        if (email === null || email === '' || !email.includes('@')) {
            this.setState({ error: 'Email inválido' });
            return false;
        }
        if (password === null || password === '' || password.length < 6) {
            this.setState({ error: 'La contraseña no puede tener menos de 6 caracteres' });
            return false;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then(resp => {
                db.collection('users').add({
                    owner: email,
                    name: name,
                    bio: this.state.bio,
                    fotoPerfil: this.state.imgPerfil,
                    createdAt: Date.now()
                })
                    .then(() => {
                        this.setState({
                            name: '',
                            email: '',
                            password: '',
                            loading: false
                        });
                        this.props.navigation.navigate("Login");
                    })
            })
    }

    redirect = () => {
        this.props.navigation.navigate('Login');
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Registra tu usuario</Text>
                    <TextInput
                        onChangeText={(text) => this.setState({ name: text, error: '' })}
                        value={this.state.name}
                        placeholder='Indica tu nombre'
                        keyboardType='default'
                        style={styles.input}
                    />
                    <TextInput
                        onChangeText={(text) => this.setState({ email: text, error: '' })}
                        value={this.state.email}
                        placeholder='Indica tu email'
                        keyboardType='email-address'
                        style={styles.input}
                    />
                    <TextInput
                        onChangeText={(text) => this.setState({ password: text, error: '' })}
                        value={this.state.password}
                        placeholder='Indica tu contraseña'
                        secureTextEntry
                        style={styles.input}
                    />

                    <TextInput
                        onChangeText={(text) => this.setState({ bio: text })}
                        placeholder='Biografía'
                        keyboardType='default'
                        value={this.state.bio}
                        style={styles.input}
                    />

                    <TextInput
                    onChangeText={(text) => this.setState({ imgPerfil: text })}
                    placeholder='Foto de perfil'
                    keyboardType='default'
                    value={this.state.imgPerfil}
                    style={styles.input}
                />

                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => this.onSubmit(this.state.name, this.state.email, this.state.password)}
                    >
                        <Text style={styles.textBtn}>Registrarme</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            ¿Ya tienes una cuenta?
                            <TouchableOpacity onPress={this.redirect}>
                                <Text style={styles.link}> Ingresa aquí</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>

                    {this.state.error !== '' &&
                        <Text style={styles.error}>
                            {this.state.error}
                        </Text>
                    }
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
    formContainer: {
        width: 300,
        padding: 20,
        backgroundColor: '#000',
        borderRadius: 10,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderColor: '#8B0000',
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
        color: '#fff',
        backgroundColor: '#333',
    },
    btn: {
        backgroundColor: '#e50914',
        textAlign: 'center',
        padding: 10,
        borderRadius: 5,
    },
    textBtn: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    footerText: {
        color: '#fff',
    },
    link: {
        color: '#e50914',
        fontWeight: 'bold',
    },
    error: {
        color: '#e50914',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default Register;
