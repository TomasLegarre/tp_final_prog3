import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../../config/config';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      error: ''
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('email logueado', auth.currentUser.email);
      }
    });
  }

  loginUser(email, password) {
    if (email === null || email === '' || !email.includes('@')) {
      this.setState({ error: 'FORMATO DEL MAIL INVALIDO' });
      return false;
    }
    if (password === null || password === '') {
      this.setState({ error: 'LA CONTRASEÑA DEBE TENER MINIMO 6 CARACTERES' });
      return false;
    }

    auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.props.navigation.navigate('navtab');
      })
      .catch(err => {
        if (err.code === 'auth/internal-error') {
          this.setState({ error: 'Contraseña o Email incorrecta' });
        }
      });
  }

  redirect() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>INGRESE AQUI</Text>
        <TextInput
          onChangeText={(text) => this.setState({ email: text, error: '' })}
          value={this.state.email}
          placeholder='Escriba su @ email'
          keyboardType='default'
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TextInput
          onChangeText={(text) => this.setState({ password: text, error: '' })}
          value={this.state.password}
          placeholder='Ingrese su contraseña * * *'
          keyboardType='default'
          secureTextEntry={true}
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.loginUser(this.state.email, this.state.password)}
        >
          <Text style={styles.textBtn}>INGRESAR</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
          <TouchableOpacity
            onPress={() => this.redirect()}
          >
            <Text style={styles.registerLink}> Registrate</Text>
          </TouchableOpacity>
        </View>
        {this.state.error !== '' &&
          <Text style={styles.errorText}>
            {this.state.error}
          </Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#E50914',
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    padding: 10,
    color: '#fff',
    backgroundColor: '#333',
  },
  btn: {
    backgroundColor: '#E50914',
    textAlign: 'center',
    padding: 15,
    borderRadius: 5,
  },
  textBtn: {
    color: 'white',
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#888',
  },
  registerLink: {
    color: '#E50914',
    marginLeft: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  }
});

export default Login;
