import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import ListItem from '../components/ListItem';

export default ({ navigation }) => {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        const response = await fetch('http://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        setUsers(data)
        setLoading(false)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <View style={styles.container}>
            {
                loading ? <Text>cargando...</Text> :
                <FlatList
                    style={styles.list}
                    data={users}
                    keyExtractor={x => String(x.id)}
                    renderItem={({ item }) => <ListItem onPress={() => navigation.navigate('Posts', { user_id: item.id })} title={item.name} />}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    list: {
        alignSelf: 'stretch'
    }
});