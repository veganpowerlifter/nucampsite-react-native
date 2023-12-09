import { FlatList, Text, View } from 'react-native';
import { Tile } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponent';

const DirectoryScreen = ({ navigation }) => {
    const campsites = useSelector((state) => state.campsites);
       // const [campsites, setCampsites] = useState(CAMPSITES); this is local. replaced witha  reducer above

       if (campsites.isLoading) {
        return <Loading />;
    }
    if (campsites.errMess) {
        return (
            <View>
                <Text>{campsites.errMess}</Text>
            </View>
        );
    }

    const renderDirectoryItem = ({ item: campsite }) => {
        return (
            <Tile
                title={campsite.name}
                caption={campsite.description}
                featured // boolean prop
                onPress={() =>
                    navigation.navigate('CampsiteInfo', { campsite })
                }
                imageSrc={{ uri: baseUrl + campsite.image }}
            />
        );
    };
    return (
        <FlatList
            data={campsites.campsitesArray}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default DirectoryScreen;