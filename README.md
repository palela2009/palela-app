# Palela App - Global State Management with useContext & useReducer

## 📱 აპლიკაციის სტრუქტურა

### 🌍 გლობალური State Management

#### ProfileContext (`contexts/ProfileContext.tsx`)

**useContext + useReducer** კომბინაცია გლობალური state-ის მართვისთვის:

```typescript
// Context შექმნა
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Reducer function
const profileReducer = (state: ProfileState, action: ProfileAction): ProfileState => {
  switch (action.type) {
    case "UPDATE_FIELD": // ველის განახლება
    case "RESET":        // საწყისი მნიშვნელობების დაბრუნება
    case "SAVE":         // შენახვა
  }
};

// Provider component - გარს აკრავს მთელ აპლიკაციას
export function ProfileProvider({ children }) {
  const [profile, dispatch] = useReducer(profileReducer, initialProfileState);
  return <ProfileContext.Provider value={{ profile, dispatch }}>...</ProfileContext.Provider>;
}

// Custom hook - მარტივი წვდომისთვის
export function useProfile() {
  return useContext(ProfileContext);
}
```

#### Provider Setup (`app/_layout.tsx`)

```typescript
import { ProfileProvider } from '../contexts/ProfileContext';

export default function RootLayout() {
  return (
    <ProfileProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ProfileProvider>
  );
}
```

### 📄 სქრინების გამოყენება

#### 1. პროფილის ნახვა (`app/(tabs)/profile/index.tsx`)

```typescript
import { useProfile } from "../../../contexts/ProfileContext";

export default function ProfileScreen() {
  const { profile } = useProfile(); // წაიკითხე გლობალური state
  
  return (
    <View>
      <Text>{profile.firstName} {profile.lastName}</Text>
      <Text>{profile.email}</Text>
      <Text>{profile.phone}</Text>
    </View>
  );
}
```

#### 2. პროფილის რედაქტირება (`app/(tabs)/profile/edit.tsx`)

```typescript
import { useProfile } from "../../../contexts/ProfileContext";

export default function EditProfileScreen() {
  const { profile, dispatch } = useProfile(); // წაიკითხე state და dispatch
  const [formData, setFormData] = useState({ ...profile }); // ლოკალური state ფორმისთვის
  
  const handleSave = () => {
    // განაახლე გლობალური state
    dispatch({ type: "UPDATE_FIELD", field: "firstName", value: formData.firstName });
    dispatch({ type: "UPDATE_FIELD", field: "lastName", value: formData.lastName });
    dispatch({ type: "UPDATE_FIELD", field: "email", value: formData.email });
    dispatch({ type: "UPDATE_FIELD", field: "phone", value: formData.phone });
    dispatch({ type: "SAVE" });
  };
  
  const handleReset = () => {
    setFormData({ ...profile }); // დააბრუნე გლობალური state-ის მნიშვნელობები
  };
}
```

#### 3. სხვა სქრინებიდან წვდომა (მაგ: `phones/index.tsx`, `laptops/index.tsx`)

```typescript
import { useProfile } from "../../../contexts/ProfileContext";

export default function PhoneListScreen() {
  const { profile } = useProfile(); // ნებისმიერი კომპონენტიდან წვდომა!
  
  return (
    <View>
      <Text>გამარჯობა, {profile.firstName}! 👋</Text>
      {/* ... phones list */}
    </View>
  );
}
```

## 🎯 ძირითადი უპირატესობები

### ✅ გლობალური State
- **ერთი state, მრავალი სქრინი**: profile state ხელმისაწვდომია ყველგან
- **არა prop drilling**: არ გჭირდება props-ით გადაცემა

### ✅ useReducer Pattern
- **Predictable State Updates**: ყველა ცვლილება reducer-ში
- **Type Safety**: TypeScript types-ით
- **Debugging**: მარტივად თვალყურის დევნება

### ✅ Custom Hook (useProfile)
- **Clean API**: `const { profile, dispatch } = useProfile()`
- **Error Handling**: ავტომატური შემოწმება Provider-ზე
- **Reusability**: ერთხელ დაწერე, ყველგან გამოიყენე

## 📂 ფაილური სტრუქტურა

```
palela-app/
├── contexts/
│   └── ProfileContext.tsx       # Global State (useContext + useReducer)
├── components/
│   └── Card.tsx                 # Reusable Card component
├── app/
│   ├── _layout.tsx              # Root Layout (ProfileProvider)
│   └── (tabs)/
│       ├── _layout.tsx          # Tabs Layout
│       ├── phones/
│       │   ├── _layout.tsx
│       │   ├── index.tsx        # ✅ იყენებს useProfile()
│       │   └── [id].tsx
│       ├── laptops/
│       │   ├── _layout.tsx
│       │   ├── index.tsx        # ✅ იყენებს useProfile()
│       │   └── [id].tsx
│       └── profile/
│           ├── _layout.tsx
│           ├── index.tsx        # ✅ იყენებს useProfile() (read)
│           └── edit.tsx         # ✅ იყენებს useProfile() (read + write)
```

## 🚀 როგორ მუშაობს?

1. **ProfileProvider** გარს აკრავს მთელ აპლიკაციას `app/_layout.tsx`-ში
2. **useReducer** მართავს profile state-ს და dispatch function-ს
3. **Context** ავრცელებს `{ profile, dispatch }`-ს component tree-ზე
4. **useProfile()** hook იძლევა მარტივ წვდომას ნებისმიერ კომპონენტში
5. **ნებისმიერი სქრინი/კომპონენტი** შეუძლია:
   - წაიკითხოს `profile` data
   - განაახლოს `dispatch()` გამოყენებით

## 📝 Actions

```typescript
// ველის განახლება
dispatch({ type: "UPDATE_FIELD", field: "firstName", value: "ნიკა" });

// საწყისი მნიშვნელობების დაბრუნება
dispatch({ type: "RESET", initialState });

// შენახვა (ამჟამად არაფერს აკეთებს, მაგრამ შეიძლება API call)
dispatch({ type: "SAVE" });
```

## 🔄 Data Flow

```
User Action (Edit Screen)
    ↓
dispatch({ type: "UPDATE_FIELD", ... })
    ↓
profileReducer (in Context)
    ↓
Global State Updated
    ↓
All Components Re-render (that use useProfile)
    ↓
UI Updates Everywhere! ✨
```

## 💡 მაგალითები

### პროფილის სახელის ცვლილება:
1. გადადი Profile tab → რედაქტირება
2. შეცვალე "სახელი" ველი
3. დააჭირე "შენახვა"
4. **დაუყოვნებლივ აისახება**:
   - Profile tab-ზე (index.tsx)
   - Phones tab-ზე ("გამარჯობა, [სახელი]!")
   - Laptops tab-ზე ("გამარჯობა, [სახელი]!")

### გაუქმება:
1. რედაქტირებისას შეცვალე რამდენიმე ველი
2. დააჭირე "გაუქმება"
3. ყველა ველი უბრუნდება წინა მნიშვნელობებს

---

**Built with:** React Native, Expo Router, TypeScript, useContext, useReducer
