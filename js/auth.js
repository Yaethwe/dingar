// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA_luC-v54Rwv_D7Z9Kn3n1jjacpOpC1z8",
    authDomain: "cool-devs.firebaseapp.com",
    databaseURL: "https://cool-devs-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cool-devs",
    storageBucket: "cool-devs.appspot.com",
    messagingSenderId: "526639962804",
    appId: "1:526639962804:web:284b37771d1c2b25d195e1",
    measurementId: "G-1PQ9ZZRH4N"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database().ref();
var UID;
function signup(email, password){
    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred =>{
        return cred.user;
    });
}

function signin(email, password){
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        return cred.user;
    });
}

function signout(){
    auth.signOut();
    location.href="../index.html";
}

const data = {
    wallet:{
        bal:0,
    },
    user:{
        name:"",
        email:"",
        bio:"",
        profilePicture:"",
        birthYear:"",
    },
};