import React, { useState, useEffect } from 'react';
import { AppRegistry } from 'react-native';
import { View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  initializeAuth,
  getReactNativePersistence
} from '@firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from './firebase-config';
import { BlurView } from 'expo-blur';

const image = { uri: 'https://ingelecsa.cl/wp-content/uploads/2019/12/wallhaven-3k591v-scaled.jpg' };
const profilePicture = { uri: 'https://media.licdn.com/dms/image/C4E0BAQGsPALxnMuXMQ/company-logo_200_200/0/1630592433369?e=2147483647&v=beta&t=ANpToykzNjNH9bgqPJN-lheIXuS45XToqN3qxLyKIzQ' };
const asyncStoragePersistence = getReactNativePersistence(AsyncStorage);
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Inicio de Sesión' : 'Registro'}</Text>
      <ImageBackground source={image} resizeMode="cover" style={[styles.image,StyleSheet.absoluteFill]}>
      <ScrollView contentContainerStyle = {{
        flex: 1,
        width: '100',
        heigth: '100',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <BlurView intensity={90}>
          <View style={styles.login}>
            <Image source={profilePicture} style={styles.profilePicture}/>
            <View>
              <Text style={{
                fontSize: 17, 
                fontWeight: '400', 
                color: 'black'}}>
                Correo Electrónico</Text>
              <TextInput
               style={styles.input}
               value={email}
               onChangeText={setEmail}
               placeholder="usuario@ingelecsa.cl"
               autoCapitalize="none"
               />
              <Text style={{
                fontSize: 17, 
                fontWeight: '400', 
                color: 'black'}}>
                                                   Contraseña</Text>
              <TextInput 
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Clave"
                secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
              <Button title={isLogin ? 'Ingresar' : 'Registrarse'} onPress={handleAuthentication} color="#3498db" />
            </View>

            <View style={styles.bottomContainer}>
              <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Registro' : 'Inicio de Sesión'}
              </Text>
            </View>
            
          </View>
        </BlurView>
      </ScrollView>
      </ImageBackground>
    </View>
  );
}


const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Button title="Cerrar Sesión" onPress={handleAuthentication} color="#e74c3c" />
    </View>
  );
};
export default App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  
  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
        } else {
          // Sign up
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        // Show user's email if user is authenticated
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
        // Show sign-in or sign-up form if user is not authenticated
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </ScrollView>
  );
}

AppRegistry.registerComponent('main', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  login: {
    width: 370,
    height: 600,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignContent: 'center',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 2,
    marginVertical: 30,
    marginLeft: 123,
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: 350,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#00CFEB90',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '10,',
    marginLeft: 50,
    borderColor: '#fff',
    borderWidth: 1,
  }
});