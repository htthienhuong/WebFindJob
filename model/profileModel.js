import { getStorage, ref as Rref , getDownloadURL} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getDatabase, ref, child, get,  onValue  } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";



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
const db = ref(getDatabase(app));



const profile=JSON.parse(sessionStorage.getItem('profile'));

if(profile!==null){
    let element = document.getElementById("loading-page");
    element.classList.add("loading-page")

    
    get(child(db, `users/${profile.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            
            console.log(snapshot.val())
            for(let i=0;i<document.getElementsByClassName('username').length;i++){
                document.getElementsByClassName('username')[i].innerText=snapshot.val().username
            }
            document.getElementById('email').innerText = snapshot.val().email;

            document.getElementById('usernameEdit').value = snapshot.val().username;

            element.classList.remove("loading-page")

            
    
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    }) 


}
else{
    for(let i=0;i<document.getElementsByClassName('username').length;i++){
        document.getElementsByClassName('username')[i].innerText='Customer'
    }
}