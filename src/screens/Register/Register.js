import React, {Component} from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { db, auth } from "../../config/config.js";

class Register extends Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            name:'',
            bio:'',
            img:'',
        }
    }


    componentDidMount(){
        console.log('Hizo el didMount y estas son sus props')
        console.log(this.props)
        // despues poner que te redireccione al login    
    }


    onSubmit(name,email,password){
        if(
            name === null || name === '' || name.length < 4
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
        <Text>Registrar un usuario</Text>
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
            placeholder='email           *obligatorio*'
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#141414', // Netflix background color
    },
    title: {
        color: '#fff', // White text
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderColor: '#e50914', // Netflix red color
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
        color: '#fff', // White text
        backgroundColor: '#333', // Darker background for input
    },
    btn: {
        backgroundColor: '#e50914', // Netflix red color
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
        color: '#fff', // White text
    },
    link: {
        color: '#e50914', // Netflix red color
        fontWeight: 'bold',
    },
    error: {
        color: '#e50914', // Netflix red color
        textAlign: 'center',
        marginTop: 10,
    }
});



export default Register