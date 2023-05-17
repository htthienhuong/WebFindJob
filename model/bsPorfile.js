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
    getDownloadURL(Rref(storage, profile.email))
    .then((url) => {
        // `url` is the download URL for bussiness logo
        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
            const blob = xhr.response;
        };

        xhr.open('GET', url);
        
        const img = document.getElementById('img');
        img.setAttribute('src', url);

        const img1 = document.getElementById('img1');
        img1.setAttribute('src', url)

        const img2 = document.getElementById('img2');
        img2.setAttribute('src', url)

        document.getElementById('email').innerText=profile.email;
        // const name = document.getElementById('name').value

        get(child(db, `users/${profile.uid}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val())

                document.getElementById('place').innerText = snapshot.val().tinhthanh
                document.getElementById('describe').innerText = snapshot.val().describe
                document.getElementById('namecpn').innerText=snapshot.val().namecpn;
                document.getElementById('namecpnEdit').value = snapshot.val().namecpn;
                
                document.getElementById('tinh').innerText = snapshot.val().tinhthanh;
                document.getElementById('tinh').value = snapshot.val().tinhthanh;

                document.getElementById('name').value = snapshot.val().username;
                document.getElementById('describeEdit').value = snapshot.val().describe; 

                document.getElementById('addressUser').innerText = snapshot.val().address ;
                document.getElementById('address').value = snapshot.val().address ;

                const describeEdit = document.getElementById('describeEdit').value;
                for(let i=0;i<document.getElementsByClassName('username').length;i++) {
                    document.getElementsByClassName('username')[i].innerText=snapshot.val().username
                }
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        })   
    })
    .catch((error) => {
    // Handle any errors
    });
}
else {
    for(let i=0;i<document.getElementsByClassName('username').length;i++){
        document.getElementsByClassName('username')[i].innerText='Customer'
    }
}
    