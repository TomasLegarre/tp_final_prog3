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
    if (password === null || password === '' || password.length < 6) {
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
        <View style={styles.formContainer}>
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

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              ¿No tienes una cuenta?
              <TouchableOpacity onPress={() => this.redirect()}>
                <Text style={styles.link}> Registrate</Text>
              </TouchableOpacity>
            </Text>
          </View>
          {this.state.error !== '' &&
            <Text style={styles.error}>
              {this.state.error}
            </Text>
          }
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
    backgroundColor: '#141414',
  },
  formContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#000',
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#8B0000',
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    color: '#fff',
    backgroundColor: '#333',
  },
  btn: {
    backgroundColor: '#e50914',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
  },
  textBtn: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
  },
  link: {
    color: '#e50914',
    fontWeight: 'bold',
  },
  error: {
    color: '#e50914',
    textAlign: 'center',
    marginTop: 10,
  }
});

export default Login;
