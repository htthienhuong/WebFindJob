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

const cvprofile=JSON.parse(sessionStorage.getItem('cvprofile'));




const storageRef = sRef(storage, `cvUser/${profile.uid}`);
getDownloadURL(sRef(storage, `cvUser/${profile.uid}`))
            .then((url) => {
              console.log('a')
            // url is the download URL for bussiness logo

            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const blob = xhr.response;
                console.log(blob)
            };
            xhr.open('GET', url);

            const img = document.getElementById('img1');
            img.setAttribute('src',url)
            
         
            

            })
            .catch((error) => {
            // Handle any errors
            });

 document.getElementById('phone').innerText = cvprofile.phone
 document.getElementById('prof_exp').innerText = cvprofile.prof_exp
 document.getElementById('email').innerText = cvprofile.email
 document.getElementById('locate').innerText = cvprofile.locate
 document.getElementById('edu_exp').innerText = cvprofile.edu_exp
 document.getElementById('skill_exp').innerText = cvprofile.skill_exp

 document.getElementById('word_exp').innerText = cvprofile.word_exp

 document.getElementById('lang_exp').innerText = cvprofile.lang_exp