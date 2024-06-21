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
    const { info } = this.props.route.params;
  
    db.collection("posts")
      .doc(info.id)
      .onSnapshot(doc => {
        this.setState({
          arrComentarios: doc.exists ? doc.data().comentarios || [] : []
        });
      });
  }
  

  enviarComentario(comentario) {
    const nuevoComentario = {
      owner: auth.currentUser.email,
      createdAt: Date.now(),
      coment: comentario,
    };

    const { info } = this.props.route.params;

    db.collection("posts")
      .doc(info.id)
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
        <Text style={styles.header}>Comentarios</Text>
        {this.state.arrComentarios.length === 0 ? (
          <Text style={styles.noComments}>No hay comentarios en esta publicación</Text>
        ) : (
          <FlatList 
            data={this.state.arrComentarios}
            keyExtractor={(item, index) => `${index}_${item.createdAt}`} 
            renderItem={({ item }) => (
              <View style={styles.comment}>
                <Text style={styles.commentUser}>{item.owner}:</Text>
                <Text style={styles.commentText}>{item.coment}</Text>
              </View>
            )}
          />
        )}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Escribe tu comentario"
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
    backgroundColor: 'black',
    padding: 20,
  },
  header: {
    color: '#FFEBEE',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  noComments: {
    color: '#FFEBEE',
    fontSize: 18,
    textAlign: 'center',
  },
  comment: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  commentUser: {
    color: '#D32F2F',
    fontWeight: 'bold',
  },
  commentText: {
    color: '#FFEBEE',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#D32F2F',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFEBEE',
    fontWeight: 'bold',
  },
});

export default Comentarios;
