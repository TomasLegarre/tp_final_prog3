import React, { Component } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { db, auth } from '../../config/config';
import Posteo from '../../Componentes/Posteo';

class HomeScreen extends Component {
    constructor() {
        super()
        this.state = {
            postList: [],
            loader: true
        }
    }

    componentDidMount() {
        db.collection('posts').onSnapshot(
            docs => {
                let postsShown = [];

                docs.forEach(posteo => {
                    postsShown.push({
                        id: posteo.id,
                        data: posteo.data()
                    })
                })
                this.setState({ postList: postsShown, loader: false })
            })
    }

    render() {
        console.log('current user:', auth.currentUser)
        return (
            <View style={{ flex: 1 }}>
                {this.state.loader === true ? <ActivityIndicator size='large' color='gray' />
                    :
                    <View style={styles.generalContainer}>
                        {console.log('estoy en homeScreen')}
                        <Text style={styles.title}>NetflixGram</Text>

                        <FlatList
                            data={this.state.postList}
                            keyExtractor={posteo => posteo.id.toString()}
                            renderItem={({ item }) => <Posteo postInfo={item} navigation={this.props.navigation} style={styles.element} />}
                            style={styles.flatList}
                        />
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,
        backgroundColor: '#141414', // Fondo negro
        padding: 10,
    },
    title: {
        color: '#E50914', 
        fontWeight: 'bold',
        fontSize: 40,
        marginBottom: 20,
        textAlign: 'center',
    },
    flatList: {
        flex: 1,
        width: '100%',
    },
    element: {
        backgroundColor: '#1c1c1c', 
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 8,
    },
    input: {
        height: 40,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#E50914',
        borderRadius: 6,
        marginVertical: 10,
        color: '#fff',
    },
    button: {
        backgroundColor: '#E50914',
        paddingHorizontal: 15,
        paddingVertical: 10,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#E50914',
        marginVertical: 10,
    },
    textButton: {
        color: '#fff',
        fontWeight: 'bold',
    }
})

export default HomeScreen;
