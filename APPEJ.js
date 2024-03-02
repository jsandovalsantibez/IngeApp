import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';


const image = { uri: 'https://ingelecsa.cl/wp-content/uploads/2019/12/wallhaven-3k591v-scaled.jpg' };
const profilePicture = { uri: 'https://media.licdn.com/dms/image/C4E0BAQGsPALxnMuXMQ/company-logo_200_200/0/1630592433369?e=2147483647&v=beta&t=ANpToykzNjNH9bgqPJN-lheIXuS45XToqN3qxLyKIzQ' };

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>HomeScreen</Text>
    </View>
  );
}

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Account created!');
        const user = userCredential.user;
        console.log(user);
      })
      .catch(error => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  const handleSinIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Signed in!', userCredential.user);n
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  };
  return(
    <View style={styles.container}>
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
            <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>Correo Electrónico</Text>
            <TextInput style={styles.input} placeholder='usuario@ingelecsa.cl'/>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'black'}}>Contraseña</Text>
            <TextInput style={styles.input} placeholder='xxxxxxxxxxxx'/>
          </View>
          <TouchableOpacity onPress={handleSinIn} style={styles.button}>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
            <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Crear Cuenta</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </ScrollView>
    </ImageBackground>
  </View>
  );
}

export default function App() {
  return(
    <LoginScreen/>
  );
}

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
