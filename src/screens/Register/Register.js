import React, {Component} from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { db, auth } from "../../config/config.js";

class Register extends Component{
    constructor(){
        suuper()
        this.state={
            email:'',
            password:'',
            username:'',
            bio:'',
            img:'',
        }
    }


    componentDidMount(){
        console.log('Hizo el didMount y estas son sus props')
        console.log(this.props)
        // despues poner que te redireccione al home    
    }


    registrarse(email,password,username){
        if(
            username === null || username === '' || username.length < 4
        ){
            this.setState({error: 'El nombre de usuario debe ser mayor a 4 caracteres'})
            return false
        }
        if(
            email === null || email === '' || !email.includes('@')
        ){
            this.setState({error: 'Email invalido'})
            return false
        }
        if(

            password === null || password === '' || password.length < 6
        ){
            this.setState({error: 'La password no puede tener menos de 6 caracteres'})
            return false
        }


        auth.createUserWithEmailAndPassword(email,password)
        .then((user)=>{
            if(user){
                console.log("usuario registrado")
            }
        })
        .catch((err) =>{ 
            if(err.code === "auth/email-already-in-use"){
                this.setState({error:'El email ya se encuentra en uso'})
            }
        })
        }

        redirect(){
            this.props.navigation.navigate('login')
        }


render(){
    return(
        <View>
        <Text>Registra tu usuario</Text>
        <TextInput
            onChangeText={(text) => this.setState({name: text, error: ''})}
            value={this.state.name}
            placeholder='Indica tu nombre'
            keyboardType='default'
            style={styles.input}
        />
        <TextInput
            onChangeText={(text) => this.setState({email: text, error: ''})}
            value={this.state.email}
            placeholder='Indica tu email'
            keyboardType='default'
            style={styles.input}
        />
        <TextInput
            onChangeText={(text) => this.setState({password: text, error: ''})}
            value={this.state.password}
            placeholder='Indica tu password'
            keyboardType='default'
            style={styles.input}
        />
        <TouchableOpacity
            style={styles.btn}
            onPress={()=> this.onSubmit(this.state.name, this.state.email, this.state.password)}
        >
            <Text style={styles.textBtn}>Registrarme</Text>
        </TouchableOpacity>
        <View>
            <Text>
                Ya tienes una cuenta?
            <TouchableOpacity
                onPress={()=> this.redirect()}
            >
                <Text>Ingresa aqui</Text>
            </TouchableOpacity>
            </Text>
        </View>
        {
            this.state.error !== '' ?
            <Text>
                {this.state.error}
            </Text>
            : 
            ''
        }
    </View>
    )
}
}   