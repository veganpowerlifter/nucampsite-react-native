import { FlatList, StyleSheet, Text, View, Button, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { useState } from 'react';
import { Input, Rating } from 'react-native-elements';

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    //how don i pass the event handler showModal as one of the props from CampsiteInfoScreen? line 48

    // const [favorite, setFavorite] = useState(false); - removed to useSelector hook instead

    const handleSubmit = () => {
        const newComment = {
            author,
            rating,
            text,
            campsiteID: campsite.id // HELP https://medium.com/swlh/es6-object-property-shorthand-make-those-objects-look-cleaner-9392c6ebb18d
        };
        console.log(newComment);
        setShowModal(!showModal); // how do i call call setShowModal(!showModal) ?
    };

    const resetForm = () => {
        setAuthor('');
        setRating(5);
        setText(''); // https://medium.com/swlh/es6-object-property-shorthand-make-those-objects-look-cleaner-9392c6ebb18d
    };

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}
                </Text>
            </View>
        );
    };

    const [showModal, setShowModal] = useState(false);
    // create a local state variable called showModal and a setting function setShowModal with the useState hook passing false as the initial value

    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState(''); // need '' to initialize an empty string?

    return (
        <>
            <FlatList
                data={comments.commentsArray.filter(
                    (comment) => comment.campsiteId === campsite.id
                )}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    marginHorizontal: 20,
                    paddingVertical: 20
                }}
                ListHeaderComponent={
                    <>
                        {/* react framgent tag is like View component */}
                        <RenderCampsite
                            campsite={campsite}
                            isFavorite={favorites.includes(campsite.id)}
                            markFavorite={() => dispatch(toggleFavorite(campsite.id))}
                            onShowModal={() => setShowModal(!showModal)}
                        />
                        <Text style={styles.commentsTitle}>Comments</Text>
                    </>
                }
            />
            {/* //modal week 2 workshop */}
            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.modal}>
                    <Rating
                        showRating // https://reactnativeelements.com/docs/3.4.2/rating
                        startingValue={rating}
                        imageSize={40}
                        onFinishRating={(rating) => setRating(rating)} // EXPLAIN PLZ
                        style={{ paddingVertical: 10 }}
                    />
                    <View>
                        <Input // https://reactnativeelements.com/docs/3.4.2/input
                            placeholder={author} //from usestate const setup line 52
                            leftIcon={'user-o'}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(author) => setAuthor(author)} //anonymous function
                            value={text}
                        />
                    </View>
                    <View>
                        <Input //https://reactnative.dev/docs/textinput
                            placeholder={text}
                            leftIcon={'comment-o'}
                            leftIconContainerStyle={{ paddingRight: 10 }} //object is padding right
                            onChangeText={(text) => setText(text)}
                            value={text}
                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => { //what's the () for? gesture event = void??
                                setShowModal(!showModal);
                                resetForm();
                            }}
                            color='#808080'
                            title='Cancel'
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default CampsiteInfoScreen;