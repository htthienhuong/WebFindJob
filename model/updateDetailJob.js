import { getDatabase, ref, child, update } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
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
const db = getDatabase(app);
const job=JSON.parse(sessionStorage.getItem('job'));
console.log(JSON.parse(sessionStorage.getItem('job')))
const updatebutton = document.getElementById('update');

updatebutton.addEventListener('click',(e)=>{
    const jobname = document.getElementById('jobname').value;
    const salary = document.getElementById('salary').value;
    const pos = document.getElementById('pos').value;
    const jobtime = document.getElementById('jobtime').value;
    const place = document.getElementById('place').value;
    const describe = document.getElementById('describe').value;
    const advand = document.getElementById('advand').value;
    const require = document.getElementById('require').value;
    const exp = document.getElementById('exp').value;

    const postData = {
        job : jobname,
        pos : pos,
        jobtime : jobtime,
        exp : exp,
        range : parseInt(salary),
        describe : describe,
        advand : advand,
        require : require,
        address : place,
    };
    update(ref(db, `recruit/${job.id}`),postData);
    alert('Success')
});





    