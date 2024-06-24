import React, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { db, auth } from '../../config/config';
import Posteo from '../../Componentes/Posteo';

class NoProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      userPosts: [],
      loading: true,
      mail: '',
      userEmail: this.props.route.params.userEmail, // Asegúrate de recibir el parámetro correctamente
    };
  }
    
  getUserData() {
    let user = this.state.userEmail;

    db.collection("users").where("owner", '==', user) // Asegúrate de que el campo coincide con tu base de datos
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
          loading: false,
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
        loading: false,
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
      <View style={styles.container}>
            {userExists ? (
              <>
                <Text style={styles.texto}>{userInfo[0].data.name}</Text>
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
            <View style={styles.profileContainer}> 
              <FlatList
                data={userPosts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Posteo 
                    postInfo={item} 
                    navigation={this.props.navigation} 
                    style={styles.element} 
                  />
                  )}
              />
            </View>

            )}
            <TouchableOpacity onPress={() => this.backToHome()} style={styles.button}>
              <Text style={styles.buttonText}>Volver a home</Text>
            </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    backgroundColor: '#000', 
  },
  profileContainer: {
    flex: 1,
    width: '90%',
    padding: 20,
    backgroundColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
},
  pageTitle: {
    color: 'white',
    fontSize: 40,
    padding: 15,
    backgroundColor: '#E50914', 
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
    color: 'white', 
    fontSize: 17,
  },
  bio: {
    fontWeight: 'normal',
    color: 'white', 
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
    backgroundColor: '#E50914', 
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
    color: '#E50914', 
    paddingVertical: 20,
  },
  borrar: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#E50914', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white', 
    fontWeight: 'bold',
  },
  noUserData: {
    color: 'white', 
    fontSize: 17,
    marginBottom: 20,
  },
  noPosts: {
    color: 'white', 
    fontSize: 17,
  },
});

export default NoProfile;
