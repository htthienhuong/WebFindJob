import { getStorage,  uploadBytes,ref as sRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
 
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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



const storage = getStorage(app);
const profile=JSON.parse(sessionStorage.getItem('profile'));
console.log(profile)


document.getElementById('username').innerText = profile.userName

const buttonphoto = document.getElementById('photo')

buttonphoto.addEventListener('change',(e)=>{
    const file = document.querySelector("#photo").files[0];


// const metadata = {
//     contentType: file.type,
//     size : 100 * 100
//          };
const storageRef = sRef(storage, `cvUser/${profile.uid}`);
const uploadTask = uploadBytes(storageRef, file).then(()=>{

    
            getDownloadURL(sRef(storage, `cvUser/${profile.uid}`))
            .then((url) => {
            // url is the download URL for bussiness logo

            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const blob = xhr.response;
            };
            xhr.open('GET', url);

            const img = document.getElementById('img1');
            img.setAttribute('src', url);


            



            })
            .catch((error) => {
            // Handle any errors
            });

            })




});