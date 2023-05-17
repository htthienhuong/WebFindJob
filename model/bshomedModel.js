import { getStorage, ref , getDownloadURL} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
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
const storage = getStorage(app);

const profile=JSON.parse(sessionStorage.getItem('profile'));
console.log(JSON.parse(sessionStorage.getItem('profile')))
if(profile!==null){
    console.log('a')

    getDownloadURL(ref(storage, profile.email))
        .then((url) => {
        // `url` is the download URL for bussiness logo
        console.log('a')


        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
            const blob = xhr.response;
        };
        xhr.open('GET', url);
        
        const img = document.getElementById('img');
        img.setAttribute('src', url);
        console.log(img)
        
        for(let i=0;i<document.getElementsByClassName('username').length;i++){
            document.getElementsByClassName('username')[i].innerText=profile.userName
        }
    })
    .catch((error) => {
    // Handle any errors
    });
}
else{
    for(let i=0;i<document.getElementsByClassName('username').length;i++){
        document.getElementsByClassName('username')[i].innerText='Customer'
    }
}
    