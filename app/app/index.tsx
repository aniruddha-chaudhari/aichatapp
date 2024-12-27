import { router } from "expo-router";
import { ImageBackground, SafeAreaView, Text, View } from "react-native";
import { TouchableOpacity,GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {
  return (
    <GestureHandlerRootView>
     <SafeAreaView className="w-full h-full">
     <ImageBackground
     className="w-full h-full flex justify-between"
     source={require("../assets/images/bg.jpeg")}
     >
      <View>
        <Text className="text-white text-center text-4xl mx-6 mt-24 font-[sora-bold]">Fall In Love With Coffee</Text>
      </View>
      
      <TouchableOpacity
      className="bg-[#c67c4e] h-16 mx-6 mb-10 rounded-lg items-center justify-center"
      onPress={()=>{router.push("/[tabs]/Home")}}
      >
        <Text className="text-white text-center text-2xl font-[sora-bold]">Get Started</Text>
      </TouchableOpacity>
     </ImageBackground>
     </SafeAreaView>
    </GestureHandlerRootView>
  );
}
