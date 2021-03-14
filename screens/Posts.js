import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import ListItem from '../components/ListItem';

export default ({ navigation }) => {
    const userId = navigation.getParam('user_id')
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        const response = await fetch('http://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        setPosts(data)
        setLoading(false)
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <View style={styles.container}>
            {
                loading ? <Text>cargando...</Text> :
                <FlatList
                    style={styles.list}
                    data={posts.filter(x => x.userId === userId)}
                    keyExtractor={x => String(x.id)}
                    renderItem={({ item }) => <ListItem onPress={() => navigation.navigate('Detail', { post_id: item.id, title: item.title, body:item.body })} title={item.title} />}
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