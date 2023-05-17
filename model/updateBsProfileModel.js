import { getDatabase, ref, child, update } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getStorage,  uploadBytes,ref as sRef } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";
import { getAuth, updatePassword,reauthenticateWithCredential, EmailAuthProvider  } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

//paste here your copied configuration code
const firebaseConfig = {
    apiKey: "AIzaSyCQUJK00WWgMn44JIrjjomT6vIeUS_8Rk8",
    authDomain: "jobweb-eec25.firebaseapp.com",
    databaseURL: "https://jobweb-eec25-default-rtdb.firebaseio.com",
    projectId: "jobweb-eec25",
    storageBucket: "jobweb-eec25.appspot.com",
    messagingSenderId: "824549439889",
    appId: "1:824549439889:web:74d405fdf191e8736a4230",
    measurementId: "G-VVGVP3BX35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);
const profile=JSON.parse(sessionStorage.getItem('profile'));
const updatebutton = document.getElementById('update1');
const updateButton2 = document.getElementById('updateButton2')

updatebutton.addEventListener('click',(e)=>{
    const username = document.getElementById('name').value;
    const oldPassword = document.getElementById('password').value;
    const newPassword = document.getElementById('confirm__password').value;
    const postData = {
        username : username
    };
    update(ref(db, `users/${profile.uid}`),postData);

    if (newPassword == "") {
        alert('Success')
        location.reload();
    }
    else {
        const user = auth.currentUser;
        // TODO(you): prompt the user to re-provide their sign-in credentials
        const credential =  EmailAuthProvider.credential(auth.currentUser.email, oldPassword)

        reauthenticateWithCredential(user, credential).then(() => {
            // User re-authenticated.
            updatePassword(user, newPassword).then(() => {
                // Update successful.
                console.log('a')
            }).catch((error) => {
              // An error ocurred
              // ...
            }).then(() => {

            alert('Success')
            location.reload();
            
        });
        }).catch((error) => {
          // An error ocurred
          // ...
        });
    }
});

updateButton2.addEventListener('click',(e) => {
    const namecpn = document.getElementById('namecpnEdit').value;
    const tinhthanh = document.getElementById('tinh').value;
    const address = document.getElementById('address').value;
    const describeEdit = document.getElementById('describeEdit').value;
   
    const postData = {
        namecpn : namecpn,
        tinhthanh : tinhthanh,
        address : address,
        describe : describeEdit
    };
    update(ref(db, `users/${profile.uid}`),postData);
    const file = document.querySelector("#photo").files[0];
    if (file == undefined) {
        alert('Success')
    }
    else {
        const email = profile.email;
        const metadata = {
            contentType: file.type,
            size : 100 * 100
        };
        const storageRef = sRef(storage, email);
        const uploadTask = uploadBytes(storageRef, file, metadata);
        alert('Success')
    }
    location.reload();
});







    