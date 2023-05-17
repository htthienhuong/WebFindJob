import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";


const job=JSON.parse(sessionStorage.getItem('job'));
const profile=JSON.parse(sessionStorage.getItem('profile'));


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



const button = document.getElementById('submitCv')

button.addEventListener('click', (e) => {
    const storageRef = ref(storage, `jobCv/${job.id}/${profile.uid}`);

    const file = document.querySelector("#filecv").files[0];
    
    if(file == undefined){
      alert('Vui lòng chọn file')

    }
    else{
      uploadBytes(storageRef, file).then((snapshot) => {
        alert('Success!');
      });
    }



})

