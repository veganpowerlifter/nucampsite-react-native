import { FlatList, Text, View } from 'react-native';
import { Card, Rating } from 'react-native-elements';

const RenderComments = ({ comments }) => {
    const renderCommentItem = ({ item }) => {
        return (
            <View style={{ margin: 10 }}>
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

    return (
        <Card>
            <Card.Title>Comments</Card.Title>
            <Card.Divider />
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </Card>
    );
};

export default RenderComments;