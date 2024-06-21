import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
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
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.foto}
            source={{ uri: this.props.postInfo.data.imageURL }} 
            resizeMode='contain'
          />
        </View>

        <Text style={styles.text}>{this.props.postInfo.data.post}</Text>
        <Text style={styles.textLike}>{this.state.likes.length} likes</Text>

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
          <Text style={styles.buttonText}>Nombre de usuario: {this.props.postInfo.data.owner}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Comentarios', { info: this.props.postInfo })}>
          <Text style={styles.buttonText}>Cantidad de comentarios: {this.state.comentarios.length}</Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.comentarios.slice(0, 4)} 
          keyExtractor={(item, index) => `${index}_${item.fecha}`} 
          renderItem={({ item }) => (
            <View style={styles.comentarioContainer}>
              <Text style={styles.comentarioUsuario}>{item.usuario}</Text>
              <Text style={styles.comentarioTexto}>{item.comentario}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', 
    padding: 20,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1, // Ajusta el contenedor de la imagen para mantener la proporción
    marginBottom: 20,
  },
  foto: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
  },
  text: {
    color: '#FFEBEE',
    fontSize: 18,
    marginBottom: 10,
  },
  textLike: {
    color: '#FFEBEE',
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#D32F2F',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFEBEE',
    fontWeight: 'bold',
  },
  comentarioContainer: {
    backgroundColor: '#333', 
    padding: 8,
    marginVertical: 4,
    borderRadius: 8,
    width: '100%',
  },
  comentarioUsuario: {
    color: '#D32F2F',
    fontWeight: 'bold',
  },
  comentarioTexto: {
    color: '#FFEBEE',
  },
});

export default Posteo;
