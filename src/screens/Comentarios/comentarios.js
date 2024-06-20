import React, { Component } from 'react';
import { FlatList, TextInput, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { db, auth } from "../../firebase/config";
import firebase from "firebase";

class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrComentarios: [],
      comentario: "",
    };
  }

  componentDidMount() {
    console.log("se envian las props", this.props);
    db.collection("posteos")
      .doc(this.props.route.params.id)
      .onSnapshot(doc => {
        this.setState({
          arrComentarios: doc.data().comentarios || []
        });
      });
  }

  enviarComentario(comentario) {
    const nuevoComentario = {
      owner: auth.currentUser.email,
      createdAt: Date.now(),
      coment: comentario,
    };

    db.collection("posteos")
      .doc(this.props.route.params.id)
      .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion(nuevoComentario),
      })
      .then(() => {
        this.setState({
          comentario: "",
        });
      })
      .catch(error => {
        console.error("Error al enviar el comentario: ", error);
      });
  }
}