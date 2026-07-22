import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";


import {
getAuth,
signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyBg9KwWN44kyEFMGfmUdA8GB8Q45asGKTc",
  authDomain: "labomba-5367f.firebaseapp.com",
  projectId: "labomba-5367f",
  storageBucket: "labomba-5367f.firebasestorage.app",
  messagingSenderId: "970744670111",
  appId: "1:970744670111:web:6e245e6e6ca6d89c303faa"
};

const app = initializeApp(firebaseConfig);


const auth=getAuth(app);



document
.getElementById("loginBtn")
.addEventListener("click",login);



async function login(){


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;



try{


await signInWithEmailAndPassword(
auth,
email,
password
);



window.location.href="panel.html";



}catch(error){


document.getElementById("error")
.textContent="Usuario o contraseña incorrectos";


}


}