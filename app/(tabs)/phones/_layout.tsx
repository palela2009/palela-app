import { Stack } from 'expo-router';

export default function PhonesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'ტელეფონები' }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: 'ტელეფონის დეტალები' }}
      />
    </Stack>
  );
}
