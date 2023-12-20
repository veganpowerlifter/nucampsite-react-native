import { useState } from 'react';
import { Button, FlatList, Modal, StyleSheet, Text, View } from 'react-native';
import { Input, Rating } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { postComment } from '../features/comments/commentsSlice';
import * as Animatable from 'react-native-animatable';

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    //how don i pass the event handler showModal as one of the props from CampsiteInfoScreen? line 48

    // const [favorite, setFavorite] = useState(false); - removed to useSelector hook instead

    const handleSubmit = () => {
        const newComment = {
            author,
            rating,
            text,
            campsiteId: campsite.id// HELP https://medium.com/swlh/es6-object-property-shorthand-make-those-objects-look-cleaner-9392c6ebb18d
        };
        dispatch(postComment(newComment));
        setShowModal(!showModal);
    };

    const resetForm = () => {
        setRating(5);
        setAuthor('');
        setText('');
    };
 // https://medium.com/swlh/es6-object-property-shorthand-make-those-objects-look-cleaner-9392c6ebb18d
};

const renderCommentItem = ({ item }) => {
    return (
        <View style={styles.commentItem}>
            <Text style={{ fontSize: 14 }}>{item.text}</Text>
            <Rating
                startingValue={item.rating}
                imageSize={10}
                readonly
                style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
            />
            <Text style={{ fontSize: 12 }}>
                {`-- ${item.author}, ${item.date}`}
            </Text>
        </View>
    );
};
   // const [showModal, setShowModal] = useState(false);
    // create a local state variable called showModal and a setting function setShowModal with the useState hook passing false as the initial value

   // const [rating, setRating] = useState(5);
   // const [author, setAuthor] = useState('');
   // const [text, setText] = useState(''); // need '' to initialize an empty string?

   return (
    <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
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
                    <RenderCampsite
                        campsite={campsite}
                        isFavorite={favorites.includes(campsite.id)}
                        markFavorite={() =>
                            dispatch(toggleFavorite(campsite.id))
                        }
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
                        showRating
                        startingValue={rating}
                        imageSize={40}
                        onFinishRating={(rating) => setRating(rating)}
                        style={{ paddingVertical: 10 }}
                    />
                    <Input
                        placeholder='Author'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(author) => setAuthor(author)}
                        value={author}
                    /> // https://reactnativeelements.com/docs/3.4.2/rating
                        // https://reactnativeelements.com/docs/3.4.2/input
                        //https://reactnative.dev/docs/textinput
                  placeholder='Comment'
                  leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                  leftIconContainerStyle={{ paddingRight: 10 }}
                  onChangeText={(text) => setText(text)}
                  value={text}
              />
              <View style={{ margin: 10 }}>
                  <Button
                      onPress={() => {
                          handleSubmit();
                          resetForm();
                      }}
                      color='#5637DD'
                      title='Submit'
                  />
              </View>
              <View style={{ margin: 10 }}>
                  <Button
                      onPress={() => {
                          setShowModal(!showModal);
                          resetForm();
                      }}
                      color='#808080'
                      title='Cancel'
                  />
              </View>
          </View>
      </Modal>
  </Animatable.View>
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