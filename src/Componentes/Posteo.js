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
    console.log(this.props) // veo que me trae props asi pongo bien los nombres de cada cosa (img, descrpcion, etc)
    return (
      <View style={styles.container}>
        <Image
          style={styles.foto}
          source={{ uri: this.props.postInfo.data.imageURL }} // aca me parece que va ImageUrl --> como esta en firebase
          resizeMode='cover'
        />

        <Text style={styles.text}>{this.props.postInfo.data.post}</Text>

        <Text style={styles.textLike}> {this.state.likes !== undefined ? this.state.likes.length : 0} likes </Text>


        {/* SACO O PONGO LIKES DEPENDEINDO SI INCLUYE O NO EL LIKE DEL USUARIO */}

        {this.state.likes.includes(auth.currentUser.email) ? (

          <TouchableOpacity style={styles.button} onPress={() => this.desLike()}>
            <Text style={styles.buttonText}>Sacar like</Text>
          </TouchableOpacity>

        ) : (

          <TouchableOpacity style={styles.button} onPress={() => this.Like()}>
            <Text style={styles.buttonText}>Dar like</Text>
          </TouchableOpacity>
        )}

        {/* ESTO TE REDIREIGE AL USUARIO. si tocas profile te manda a profile. propio o ajeno */}

        <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Profile', {mail: this.props.postInfo.data.owner})}>
          <Text style={styles.buttonText}>Nombre de usuario : {this.props.postInfo.data.owner}</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Comments', { info: this.props.postInfo })}
        >
          <Text style={styles.buttonText}>
            Cantidad de comentarios: {this.state.comentarios.length}
          </Text>
        </TouchableOpacity> */}

      
        {/* <FlatList
          data={this.state.comentarios.slice(0, 4)} 
          keyExtractor={(item, index) => `${index}_${item.fecha}`} 
          renderItem={({ item }) => (
            <View style={styles.comentarioContainer}>
              <Text style={styles.comentarioUsuario}>{item.usuario}</Text>
              <Text style={styles.comentarioTexto}>{item.comentario}</Text>
            </View>
          )}
        /> */}

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
  },
  foto: {
    height: 300,
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