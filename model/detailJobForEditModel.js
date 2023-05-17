import { getDatabase, ref, child, get,  onValue  } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getStorage, ref as Rref , getDownloadURL} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";

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
const dbRef = ref(getDatabase(app));

const job=JSON.parse(sessionStorage.getItem('job'));
console.log(JSON.parse(sessionStorage.getItem('job')))

get(child(dbRef, `recruit/${job.id}`)).then((snapshot) => {
    if (snapshot.exists()) {
  
        document.getElementById('jobname').value = snapshot.val().job;
        document.getElementById('salary').value = snapshot.val().range;
        document.getElementById('pos').value = snapshot.val().pos;
        document.getElementById('jobtime').value = snapshot.val().jobtime;
        document.getElementById('place').value = snapshot.val().address;
        document.getElementById('exp').value = snapshot.val().exp;
        document.getElementById('describe').value = snapshot.val().describe;
        document.getElementById('advand').value = snapshot.val().advand;
        document.getElementById('require').value = snapshot.val().require;
        console.log(snapshot.val().exp)
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
})

 
    