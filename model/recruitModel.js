// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getDatabase, set,ref,get, child, push,update } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

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
const Database = getDatabase(app);
const upload = document.getElementById('upload');
upload.addEventListener('click',(e) => {
    const job = document.getElementById('rf-job').value;
    const pos = document.getElementById('rf-pos').value;
    const ele = document.getElementsByName('rf-jobtime');
    var jobtime

    for(var i = 0; i < ele.length; i++) {
        if(ele[i].checked) jobtime = ele[i].value
    }

    const exp = document.getElementById('rf-exp').value;
    let range = document.getElementById('rf-range-value').value;
    if(range == ""){
        range = 'Thỏa thuận'
    }

    const describe = document.getElementById('rf-describe').value;
    const advand = document.getElementById('rf-advand').value;

    const address = document.getElementById('rf-loc').value;
    const require = document.getElementById('rf-require').value;
    console.log(range)
    
    const profile=JSON.parse(sessionStorage.getItem('profile'));
    const dbRef = ref(Database);

    get(child(dbRef, `recruit`)).then(res=>{
        const db = getDatabase(app);
        // A post entry.
        const postData = {
            job : job,
            pos : pos,
            jobtime : jobtime,
            exp : exp,
            range : range,
            describe : describe,
            advand : advand,
            require : require,
            address : address,
            createdUser : profile.email,
            place : profile.place,
            namecpn : profile.namecpn
        };
        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'recruit/'+ profile.uid)).key;
      
        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['recruit/' + newPostKey] = postData;
        update(ref(db), updates);
        alert('Success')
        document.location.href = '../views/bs_homed.html';
    })
});


