import { getDatabase, ref, child, get,  onValue ,set, push,update} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
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
        getDownloadURL(Rref(storage, snapshot.val().createdUser))
        .then((url) => {
            // url is the download URL for bussiness logo
            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const blob = xhr.response;
            };
            xhr.open('GET', url);
            
            const img = document.getElementById('imgcpn');
            img.setAttribute('src', url);
        })
        .catch((error) => {
        // Handle any errors
        });
        document.getElementById('namecpn').innerText = snapshot.val().namecpn;
        document.getElementById('jobname').innerText = snapshot.val().job;
        document.getElementById('salary').innerText = snapshot.val().range;
        document.getElementById('pos').innerText = snapshot.val().pos;
        document.getElementById('jobtime').innerText = snapshot.val().jobtime;
        document.getElementById('place').innerText = snapshot.val().address;
        document.getElementById('describe').innerText = snapshot.val().describe;
        document.getElementById('advand').innerText = snapshot.val().advand;
        document.getElementById('require').innerText = snapshot.val().require;
        document.getElementById('email').innerText = snapshot.val().createdUser;
        document.getElementById('exp').innerText = snapshot.val().exp;
      
        const email = snapshot.val().createdUser;
        get(child(dbRef, `users/`))
        .then((snapshot1) => {       
            snapshot1.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                if(childData.email == email){
                    document.getElementById('describecpn').innerText = childData.describe;
                    document.getElementById('addresscpn').innerText = childData.address;
                    document.getElementById('addresscpn').classList.add('blockquote-footer');
                }
            });
            // if (snapshot1.val().email == email){
            //   console.log(snapshot1.val().describe)
            //   document.getElementById('describecpn').innerText = snapshot1.val().describe;

            // }
        }).catch((error) => {
            console.error(error);
        })

        
            let element = document.getElementById("loading-page");
            element.classList.remove("loading-page");

    } else {
      console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
})

const saveJob = document.getElementById('saveJob')
const profile=JSON.parse(sessionStorage.getItem('profile'));

saveJob.addEventListener('click',(e) =>{
    const db = getDatabase(app);
    const updates = {};
    updates[`fav/${profile.uid}/${job?.id}`] = true;
    update(ref(db), updates);
    alert("Success")




    
    
 /*  
    set(ref(db,'fav/' +profile.uid),{
       ...[job.id]
    }).then(res=>{

        console.log(res)
        alert('Success')
    })
    .catch(err=>{
        console.log(err)
    })
    // const newPostRef = push(postListRef,${});
*/

});