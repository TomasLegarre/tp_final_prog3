import React, { Component } from 'react';
import { FlatList, TextInput, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { db, auth } from "../../config/config";
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Comentarios</Text>
        {
          this.state.arrComentarios.length === 0 ? (
            <Text style={styles.noCommentsText}>No hay comentarios en esta publicación</Text>
          ) : (
            <FlatList 
              data={this.state.arrComentarios}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.commentBox}>
                  <Text style={styles.commentText}><Text style={styles.commentOwner}>{item.owner}</Text>: {item.coment}</Text>
                </View>
              )}
            />
          )
        }
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Escribe tu comentario"
            placeholderTextColor="#999"
            style={styles.input}
            keyboardType='default'
            onChangeText={text => this.setState({ comentario: text })}
            value={this.state.comentario}
          />
          <TouchableOpacity style={styles.button} onPress={() => this.enviarComentario(this.state.comentario)}>
            <Text style={styles.buttonText}>Enviar Comentario</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  noCommentsText: {
    color: '#999',
    fontSize: 18,
    textAlign: 'center',
  },
  commentBox: {
    backgroundColor: '#282828',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  commentText: {
    color: '#fff',
  },
  commentOwner: {
    fontWeight: 'bold',
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#e50914',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Comentarios;
