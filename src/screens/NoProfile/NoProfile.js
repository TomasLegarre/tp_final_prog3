import React, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { db, auth } from '../../config/config';
import Posteo from '../../Componentes/Posteo';

class NoProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      userPosts: [],
      loader: true,
      mail: '',
      profileMail: this.props.route.params.profileMail,
    };
  }
    
  getUserData() {
    let user = this.state.profileMail;

    db.collection("users").where("owner", '==', user)
      .onSnapshot((docs) => {
        let userInfo = [];
        docs.forEach((doc) => {
          userInfo.push({
            data: doc.data(),
          });
        });
        this.setState({
          userInfo: userInfo,
          mail: user,
          loader: false,
        });
        this.getUserPosts(user);
      });
  }

  getUserPosts(user) {
    db.collection("posts").where("owner", '==', user)
    .orderBy('createdAt', 'desc')
    .onSnapshot((docs) => {
      let userPosts = [];
      docs.forEach((doc) => {
        userPosts.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState({
        userPosts: userPosts,
        loader: false,
      });
    });
  }

  componentDidMount() {
    this.getUserData();
  }

  backToHome() {
    this.props.navigation.navigate('HomeScreen');
  }

  render() {
    const { userInfo, userPosts } = this.state;
    const userExists = userInfo.length > 0;

    return (
      <ScrollView contentContainerStyle={styles.container}>
          
        {userExists ? (
          <>
            <Text style={styles.texto}>{userInfo[0].data.username}</Text>
            <Text style={styles.texto}>{userInfo[0].data.owner}</Text>
            <Text style={styles.bio}>{userInfo[0].data.bio}</Text>
          </>
        ) : (
          <Text style={styles.noUserData}>No hay información del usuario</Text>
        )}
        
        <Text style={styles.texto}>Posts: {userPosts.length}</Text>
        
        {userPosts.length === 0 ? (
          <Text style={styles.noPosts}>No hay posteos</Text>
        ) : (
          <FlatList
            data={userPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Posteo postInfo={item} navigation={this.props.navigation} style={styles.element} />
            )}
          />
        )}
        <TouchableOpacity onPress={() => this.backToHome()} style={styles.button}>
          <Text style={styles.buttonText}>Volver a home</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#000', // Fondo negro
  },
  pageTitle: {
    color: 'white',
    fontSize: 40,
    padding: 15,
    backgroundColor: '#E50914', // Rojo de Netflix
    alignItems: 'center',
    justifyContent: 'center',
  },
  outFunct: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  imagen: {
    height: 100,
    width: 100,
    borderRadius: 10,
    borderColor: 'white',
  },
  texto: {
    fontWeight: 'bold',
    color: 'white', // Texto blanco
    fontSize: 17,
  },
  bio: {
    fontWeight: 'normal',
    color: 'white', // Texto blanco
    fontSize: 15,
  },
  activity: {
    marginTop: 250,
  },
  field: {
    borderWidth: 1,
    backgroundColor: 'white',
    color: '#535353',
    borderRadius: 2,
    paddingLeft: 10,
    shadowOpacity: 20,
  },
  submit: {
    padding: 10,
    color: 'white',
    backgroundColor: '#E50914', // Rojo de Netflix
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 6,
  },
  error: {
    color: 'red',
    backgroundColor: 'grey',
    borderRadius: 50,
    marginBottom: 10,
  },
  nothingText: {
    textAlign: 'center',
    color: '#E50914', // Rojo de Netflix
    paddingVertical: 20,
  },
  borrar: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#E50914', // Rojo de Netflix
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white', // Texto blanco
    fontWeight: 'bold',
  },
  noUserData: {
    color: 'white', // Texto blanco
    fontSize: 17,
    marginBottom: 20,
  },
  noPosts: {
    color: 'white', // Texto blanco
    fontSize: 17,
  },
});

export default NoProfile;
