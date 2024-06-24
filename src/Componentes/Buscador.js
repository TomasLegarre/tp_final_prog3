import { Component } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, Picker } from "react-native";
import { auth, db } from '../config/config';


class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            usersShown: [],
            filtered: 'name', 
        };
    }

    componentDidMount() {
        db.collection("users").onSnapshot((snap) => {
            let data = [];
            snap.forEach((doc) => {
                data.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            this.setState({
                usersShown: data
            });
        });
    }

    userSelected(owner) {
        if (owner === auth.currentUser.email) {
            this.props.navigation.navigate('Profile');
        } else {
            this.props.navigation.navigate('NoProfile', { userEmail: owner });
        }
    }
    


    render() {
        const usersFound = this.state.usersShown.filter((user) =>
            user.data[this.state.filtered]?.toLowerCase().includes(this.state.inputValue.toLowerCase())
        );

        return (
            <View style={styles.container}>
                <Text style={styles.title}>NetflixGram</Text>
                <Picker
                    selectedValue={this.state.filtered}
                    onValueChange={(itemValue) => this.setState({ filtered: itemValue })}
                    style={styles.picker}
                >
                    <Picker.Item label="Nombre" value="name" />
                    <Picker.Item label="Email" value="owner" />
                </Picker>
                <TextInput
                    style={styles.input}
                    placeholder={`Busca por ${this.state.filtered}`}
                    value={this.state.inputValue}
                    onChangeText={(text) => this.setState({inputValue: text })}
                />
                {usersFound.length === 0 ? (
                    <Text style={styles.result}>No existe un resultado que coincida con "{this.state.inputValue}"</Text>
                ) : (
                    <FlatList
                        data={usersFound}
                        keyExtractor={(user) => user.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.userItem}
                                onPress={() => this.userSelected(item.data.owner)}
                            >
                                <View>
                                    <Text style={styles.userName}>{item.data.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    title: {
        color: '#E50914', 
        fontWeight: 'bold',
        fontSize: 40,
        marginBottom: 20,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#141414',
    },
    img: {
        height: 70,
        width: 70,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#E50914', 
        borderWidth: 2,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: '#1c1c1c', 
        color: '#ffffff',
        fontWeight: 'bold',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        elevation: 5,
    },
    picker: {
        height: 50,
        width: 150,
        marginBottom: 20,
        color: '#ffffff', 
        backgroundColor: '#1c1c1c', 
    },
    userItem: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#1c1c1c', 
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 2,
    },
    userName: {
        fontSize: 18,
        color: '#ffffff', 
    },
    result: {
        fontSize: 10,
        color: '#ffffff', 
    },
});


export default Buscador;