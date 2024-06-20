import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { Camera } from 'expo-camera/legacy';
import { storage } from '../config/config'; 

export default class Camara extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dioPermiso: false,
      urlTemp: '',
      
    }
    this.metodosCamara = null;
  }

  componentDidMount() {
    Camera.requestCameraPermissionsAsync()
      .then(() => this.setState({ dioPermiso: true }))
      .catch(() => console.log("no hay permisos pa"));
  }

  tomarFoto() {
    this.metodosCamara.takePictureAsync()
      .then((urlTemp) => this.setState({ urlTemp: urlTemp.uri }))
      .catch((err) => console.log(err));
  }

  guardarFoto() {
    fetch(this.state.urlTemp)
      .then((img) => img.blob())
      .then((imgProcesada) => {
        var ref = storage.ref(`imagenesPost/${Date.now()}.jpeg`)
        ref.put(imgProcesada)
          .then(() => {
            ref.getDownloadURL()
              .then(url => this.props.actualizarimg(url));
          });
      })
      .catch((err) => console.log(err));
  }

  descartarFoto() {
    this.setState({
      urlTemp: ''
    });
  }

  render() {
    return (
      <View style={styles.contenedorCam}>
        {this.state.dioPermiso ? (
          this.state.urlTemp === '' ? (
            <Camera
                type={Camera.Constants.Type.back}
              style={styles.camara}
              ref={(metodos) => this.metodosCamara = metodos}
            >
              <TouchableOpacity
                style={styles.botonTomarFoto}
                onPress={() => this.tomarFoto()}
              >
                <Text style={styles.textoBoton}>Tomar foto</Text>
              </TouchableOpacity>
            </Camera>
          ) : (
            <View style={styles.contenedorImagen}>
              <Image
                style={styles.imagen}
                source={{ uri: this.state.urlTemp }}
              />
              <View style={styles.botonera}>
                <TouchableOpacity
                  style={styles.boton}
                  onPress={() => this.descartarFoto()}
                >
                  <Text style={styles.textoBoton}>Rechazar foto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.boton}
                  onPress={() => this.guardarFoto()}
                >
                  <Text style={styles.textoBoton}>Aceptar foto</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenedorCam: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camara: {
    width: '100%',
    height: '80%',
    justifyContent: 'flex-end',
  },
  botonTomarFoto: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
  },
  contenedorImagen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagen: {
    width: '80%',
    height: '70%',
    borderRadius: 10,
  },
  botonera: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '80%',
  },
  boton: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '40%',
  },
});
