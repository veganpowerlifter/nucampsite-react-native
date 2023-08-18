import { Text, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { Card } from 'react-native-elements';


const ContactNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='Contact'
                component={AboutScreen}
                options={{ title: 'Contact Us' }}
            />
        </Stack.Navigator>
    );
};

const ContactScreen = () => {
    return (
        <ScrollView>
            <Card
                wrapperStyle={{ margin: 20 }}
            >
                <Card.Title>Contact Information</Card.Title>
                <Card.Divider />
                <Text>1 Nucamp Way</Text>
                <Text>Seattle, WA 98001</Text>
                <Text
                    style={{ marginBottom: 10 }}>U.S.A.
                </Text>
                <Text>Phone: 1-206-555-1234</Text>
                <Text>Email: campsites@nucamp.co</Text>
            </Card>
        </ScrollView>
    )
};

export default ContactScreen;