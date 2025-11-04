# Authentication & Registration Flow

## 🔐 ავტორიზაცია და რეგისტრაცია

### მიმოხილვა

აპლიკაცია იყენებს **Formik** ფორმების მენეჯმენტისთვის და **Yup** ვალიდაციისთვის. ავტორიზაციის state მართულია **useContext + useReducer** პატერნით.

---

## 📁 სტრუქტურა

```
app/
├── index.tsx              # Initial redirect (login/tabs)
├── login.tsx              # ავტორიზაციის სქრინი
├── register.tsx           # რეგისტრაციის სქრინი
└── (tabs)/                # Tab layout (protected)
    ├── phones/
    ├── laptops/
    └── profile/
        └── index.tsx      # Logout ღილაკით

contexts/
├── AuthContext.tsx        # Authentication state management
└── ProfileContext.tsx     # User profile state management
```

---

## 🎯 AuthContext (contexts/AuthContext.tsx)

### State Structure

```typescript
interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  users: User[];
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}
```

### Actions

```typescript
type AuthAction =
  | { type: "REGISTER"; user: User }
  | { type: "LOGIN"; email: string; password: string }
  | { type: "LOGOUT" };
```

### Reducer Logic

#### 1. REGISTER

```typescript
case "REGISTER":
  // შემოწმება: არსებობს თუ არა იუზერი ამ ელ-ფოსტით
  const existingUser = state.users.find(u => u.email === action.user.email);
  if (existingUser) return state;

  // დამატება users array-ში
  return {
    ...state,
    users: [...state.users, action.user],
  };
```

#### 2. LOGIN

```typescript
case "LOGIN":
  // იუზერის პოვნა email და password-ით
  const user = state.users.find(
    u => u.email === action.email && u.password === action.password
  );

  if (user) {
    return {
      ...state,
      isAuthenticated: true,
      currentUser: user,
    };
  }
  return state;
```

#### 3. LOGOUT

```typescript
case "LOGOUT":
  return {
    ...state,
    isAuthenticated: false,
    currentUser: null,
  };
```

---

## 📝 რეგისტრაცია (app/register.tsx)

### Formik Configuration

```typescript
<Formik
  initialValues={{
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  }}
  validationSchema={RegisterSchema}
  onSubmit={handleRegister}
>
```

### Yup Validation Schema

```typescript
const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "სახელი უნდა იყოს მინიმუმ 2 სიმბოლო")
    .required("სახელი სავალდებულოა"),
  lastName: Yup.string()
    .min(2, "გვარი უნდა იყოს მინიმუმ 2 სიმბოლო")
    .required("გვარი სავალდებულოა"),
  email: Yup.string()
    .email("გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა")
    .required("ელ-ფოსტა სავალდებულოა"),
  phone: Yup.string()
    .matches(/^[0-9+\s-]+$/, "გთხოვთ შეიყვანოთ სწორი ტელეფონის ნომერი")
    .min(9, "ტელეფონის ნომერი ძალიან მოკლეა")
    .required("ტელეფონის ნომერი სავალდებულოა"),
  password: Yup.string()
    .min(6, "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო")
    .required("პაროლი სავალდებულოა"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "პაროლები არ ემთხვევა")
    .required("პაროლის დადასტურება სავალდებულოა"),
});
```

### Register Handler

```typescript
const handleRegister = (values) => {
  // შემოწმება: არსებობს თუ არა იუზერი
  const existingUser = authState.users.find((u) => u.email === values.email);

  if (existingUser) {
    Alert.alert("შეცდომა", "ამ ელ-ფოსტით იუზერი უკვე რეგისტრირებულია");
    return;
  }

  // რეგისტრაცია
  authDispatch({
    type: "REGISTER",
    user: {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      password: values.password,
    },
  });

  // Redirect to login
  router.replace("/login");
};
```

### ფორმის ველები

1. **სახელი** - firstName (text input)
2. **გვარი** - lastName (text input)
3. **ელ-ფოსტა** - email (email keyboard)
4. **ტელეფონი** - phone (phone-pad keyboard)
5. **პაროლი** - password (secureTextEntry)
6. **პაროლის დადასტურება** - confirmPassword (secureTextEntry)

---

## 🔑 ავტორიზაცია (app/login.tsx)

### Formik Configuration

```typescript
<Formik
  initialValues={{ email: "", password: "" }}
  validationSchema={LoginSchema}
  onSubmit={handleLogin}
>
```

### Yup Validation Schema

```typescript
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა")
    .required("ელ-ფოსტა სავალდებულოა"),
  password: Yup.string()
    .min(6, "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო")
    .required("პაროლი სავალდებულოა"),
});
```

### Login Handler

```typescript
const handleLogin = (values) => {
  // Login action
  authDispatch({
    type: "LOGIN",
    email: values.email,
    password: values.password,
  });

  // შემოწმება
  const user = authState.users.find(
    (u) => u.email === values.email && u.password === values.password
  );

  if (user) {
    // პროფილის ჩატვირთვა
    profileDispatch({
      type: "LOAD_USER",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });

    // Redirect to app
    router.replace("/(tabs)/phones");
  } else {
    Alert.alert("შეცდომა", "არასწორი ელ-ფოსტა ან პაროლი");
  }
};
```

### ფორმის ველები

1. **ელ-ფოსტა** - email (email keyboard)
2. **პაროლი** - password (secureTextEntry)

---

## 🚪 გასვლა (Logout)

### Profile Screen (app/(tabs)/profile/index.tsx)

```typescript
const { authDispatch } = useAuth();

const handleLogout = () => {
  Alert.alert("გასვლა", "დარწმუნებული ხართ რომ გსურთ სისტემიდან გასვლა?", [
    { text: "გაუქმება", style: "cancel" },
    {
      text: "გასვლა",
      style: "destructive",
      onPress: () => {
        authDispatch({ type: "LOGOUT" });
        router.replace("/login");
      },
    },
  ]);
};
```

---

## 🔄 Navigation Flow

### 1. პირველი ჩატვირთვა (app/index.tsx)

```typescript
useEffect(() => {
  if (authState.isAuthenticated) {
    router.replace("/(tabs)/phones");
  } else {
    router.replace("/login");
  }
}, [authState.isAuthenticated]);
```

### 2. User Journey

```
Start (index.tsx)
    ↓
Not Authenticated? → /login
    ↓
[რეგისტრაცია] → /register
    ↓
    Fill Form (Formik + Yup validation)
    ↓
    Submit → authDispatch({ type: "REGISTER" })
    ↓
    Redirect to /login
    ↓
[ავტორიზაცია] → /login
    ↓
    Fill Form (Formik + Yup validation)
    ↓
    Submit → authDispatch({ type: "LOGIN" })
    ↓
    profileDispatch({ type: "LOAD_USER" })
    ↓
    Redirect to /(tabs)/phones
    ↓
Authenticated! → Access to all tabs
    ↓
[გასვლა] → Profile → Logout button
    ↓
    authDispatch({ type: "LOGOUT" })
    ↓
    Redirect to /login
```

---

## 🎨 UI Features

### Login Screen

- 🔒 Lock icon header
- 📧 Email input with validation
- 🔑 Password input (secure)
- ➡️ Login button
- 📝 Link to registration
- 🐛 Debug info (shows registered users)

### Register Screen

- 👤 Person-add icon header
- 📝 6 input fields
- ✅ Real-time validation
- ✔️ Password confirmation
- 📱 Phone number formatting
- ➡️ Register button
- 🔙 Link to login

### Profile Screen

- 👤 User info display
- ✏️ Edit profile button
- 🚪 **Logout button** (red)

---

## 🔐 Security Notes

⚠️ **Warning**: პაროლები ინახება plain text-ად (დემო მიზნებისთვის)

Production-ში გამოიყენე:

- Password hashing (bcrypt, argon2)
- Secure storage (AsyncStorage encryption)
- Token-based auth (JWT)
- Backend API integration

---

## 🧪 Testing Flow

### 1. რეგისტრაცია

1. გადადი `/register`
2. შეავსე ყველა ველი:
   - სახელი: ნიკა
   - გვარი: გელაშვილი
   - ელ-ფოსტა: nika@test.com
   - ტელეფონი: +995 555 11 22 33
   - პაროლი: test123
   - დადასტურება: test123
3. დააჭირე "რეგისტრაცია"
4. Alert: "წარმატებით დარეგისტრირდით"
5. Redirect → `/login`

### 2. ავტორიზაცია

1. `/login` სქრინზე
2. შეიყვანე:
   - ელ-ფოსტა: nika@test.com
   - პაროლი: test123
3. დააჭირე "შესვლა"
4. Alert: "წარმატებით შეხვედით სისტემაში"
5. Redirect → `/(tabs)/phones`
6. ყველა tab-ზე ჩანს: "გამარჯობა, ნიკა! 👋"

### 3. გასვლა

1. გადადი Profile tab-ზე
2. დააჭირე "გასვლა" (წითელი ღილაკი)
3. Alert: "დარწმუნებული ხართ?"
4. დააჭირე "გასვლა"
5. Redirect → `/login`

---

## 📦 Dependencies

```json
{
  "formik": "^2.4.5",
  "yup": "^1.3.3"
}
```

### Installation

```bash
npm install formik yup
```

---

**Built with:** Formik, Yup, useContext, useReducer, Expo Router
