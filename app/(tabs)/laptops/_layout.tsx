import { Stack } from 'expo-router';

export default function LaptopsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'ლეპტოპები' }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: 'ლეპტოპის დეტალები' }}
      />
    </Stack>
  );
}
