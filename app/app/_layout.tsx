import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { NativeWindStyleSheet } from 'nativewind';

// Configure NativeWind before the component
NativeWindStyleSheet.setOutput({
  default:'native'
})

export default function RootLayout() {
  const [fontsloaded] =useFonts({
   'sora-regular': require('../assets/fonts/Sora-Regular.ttf'),
   'sora-semi': require('../assets/fonts/Sora-SemiBold.ttf'),
   'sora-bold': require('../assets/fonts/Sora-Bold.ttf'),
  })
  return <Stack>
    <Stack.Screen name="index"
    options={{headerShown: false}}
    />
    <Stack.Screen name="details"
    options={{headerShown: true}}
    />
    <Stack.Screen name="[tabs]"
    options={{headerShown: false}}
    />
  </Stack>
}
