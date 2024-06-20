import React, { Component } from 'react';
import { FlatList, TextInput, View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { db, auth } from "../../firebase/config";
import firebase from "firebase"

class comentarios extends Component{
    constructor(props){
        super(props);
        this.state={
            arrComentarios:[],
            comentario:"",
        };
    }

    componentDidMount(){
        console.log("se envian las props", this.props)
        db.collection("posteos")

        .doc(this.props.rout.params.id)
        .onsnapshot(doc=>{
            this.setState({
                arrComentarios:doc.data().comentarios
            });
        })
    }


    EnviarComentario(comentario){
        const nuevoComentario={
            owner:auth.currentUser.email,
        }
        
    }


}
