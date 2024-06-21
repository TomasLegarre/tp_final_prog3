import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth, db } from '../config/config';
import firebase from 'firebase';

class Posteo extends Component {
  constructor() {
    super();
    this.state = {
      likes: [],
      comentarios: [],
    };
  }

  componentDidMount() {
    this.setState({
      likes: this.props.postInfo.data.likes || [],
      comentarios: this.props.postInfo.data.comentarios || [],
    });
  }

  Like() {
    db.collection('posts')
      .doc(this.props.postInfo.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        let Array = this.state.likes;
        Array.push(auth.currentUser.email);
        this.setState({
          likes: Array,
        });
      })
      .catch(e => console.log(e));
  }

  desLike() {
    db.collection('posts')
      .doc(this.props.postInfo.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
      })
      .then(() => {
        let Array = this.state.likes;
        let ArrayFiltrado = Array.filter(usuario => usuario !== auth.currentUser.email);

        this.setState({
          likes: ArrayFiltrado,
        });
      })
      .catch(e => console.log(e));
  }

  render() {
    console.log(this.props); // veo que me trae props asi pongo bien los nombres de cada cosa (img, descrpcion, etc)
    return (
      <View style={styles.container}>
        <Image
          style={styles.foto}
          source={{ uri: this.props.postInfo.data.imageURL }} // aca me parece que va ImageUrl --> como esta en firebase
          resizeMode='cover'
        />

        <Text style={styles.text}>{this.props.postInfo.data.post}</Text>

        <Text style={styles.textLike}> {this.state.likes !== undefined ? this.state.likes.length : 0} likes </Text>

        <View style={styles.buttonContainer}>
          {this.state.likes.includes(auth.currentUser.email) ? (
            <TouchableOpacity style={styles.button} onPress={() => this.desLike()}>
              <Text style={styles.buttonText}>Sacar like</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => this.Like()}>
              <Text style={styles.buttonText}>Dar like</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Profile', { mail: this.props.postInfo.data.owner })}>
            <Text style={styles.buttonText}>Usuario: {this.props.postInfo.data.owner}</Text>
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
    backgroundColor: '#141414', // Fondo negro
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
  },
  foto: {
    height: 300,
    width: '30%', // Reduce el ancho de la imagen
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  textLike: {
    color: '#B0B0B0',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%', // Ajustar el ancho del contenedor de botones al ancho de la foto
  },
  button: {
    backgroundColor: '#E50914',
    paddingVertical: 10, // Ajustar padding vertical
    borderRadius: 8,
    marginVertical: 5,
    width: '100%', // Hacer que el botón ocupe todo el ancho del contenedor de botones
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14, // Ajustar el tamaño del texto
  },
  comentarioContainer: {
    backgroundColor: '#333333', 
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  comentarioUsuario: {
    color: '#E50914',
    fontWeight: 'bold',
  },
  comentarioTexto: {
    color: '#FFEBEE',
  },
});

export default Posteo;
