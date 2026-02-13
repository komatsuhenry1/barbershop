import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

const MyProfile = () => {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Back" onPress={() => router.back()} />
            <Text> My Profile </Text>
        </View>
    );
}

export default MyProfile;