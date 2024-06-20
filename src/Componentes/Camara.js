import { Text, View, StyleSheet  } from 'react-native'
import React, { Component } from 'react'
import {Camera} from 'expo-camera'
import { TouchableOpacity } from 'react-native-web'



export default class Camara extends Component {
    constructor(props){
        super(props)
        this.state={
            dioPermiso:false,
            urlTemp:''
        }
        this.metodosCamara=null
    }


componentDidMount(){
    Camera.requestCameraPermissionsAsync()
    .then(()=>this.state({dioPermiso:true}))
    .catch(()=> console.log("no hay permisos pa"))
}

tomarFoto(){
    this.metodosCamara.takePictureAsync()
    .then((urlTemp)=> this.setState({urlTempo: urlTemp.uri}))
    .catch((err)=> console.log(err))
}


guardarFoto(){
    fetch(this.state.urlTempo)
        .then((img)=> img.blob())
        .then((imgProcesada)=>{
            const ref = storage.ref(`imagenesPost/${Date.now()}.jpeg`)
            ref.put(imgProcesada)
            .then((url)=> {
                ref.getDownloadURL()
                .then(url => this.props.actualizarimg(url))
            })
        })
        .catch((err)=> console.log(err))
}

descartarFoto(){
    this.setState({
        urlTemp:''
    })
}



render() {
    return (
      <View style={styles.contendorCam}>
        {
          this.state.dioPermiso?
            this.state.urlTemp === ''?
              <Camera
                type={Camera.Constants.Type.back}
                style={styles.Camara}
                ref={(camera) => this.metodosCamara = camera}
              >
                <TouchableOpacity
                  onPress={() => this.tomarFoto()}
                >
                  <Text>Tomar foto</Text>
                </TouchableOpacity>
              </Camera>
            :
            <>
              <Image 
              styles={styles.Imagen}
              source={{ uri: this.state.urlTemp }} />

              <TouchableOpacity onPress={()=>this.descartarFoto}>
              <text> Rechazar foto</text>
              </TouchableOpacity>

            <TouchableOpacity>
              <text> aceptar  foto</text>
            </TouchableOpacity>
              </>
          :
            null
        }
      </View>
    )
  }
}