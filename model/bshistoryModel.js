import { getDatabase, ref, child, get,  onValue , remove} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getStorage, ref as Rref , getDownloadURL} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";

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

const app = initializeApp(firebaseConfig);
const Database = getDatabase(app);

const profile=JSON.parse(sessionStorage.getItem('profile'));
const dbRef = ref(getDatabase(), `recruit/`);


//Get image
const storage = getStorage(app);

let urlLogo;
getDownloadURL(Rref(storage, profile.email))
    .then((url) => {
    // url is the download URL for bussiness logo
    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
        const blob = xhr.response;
    };
    xhr.open('GET', url);

    urlLogo = url;
    })
    .catch((error) => {
    // Handle any errors
    });
const joblist = []
onValue(dbRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
    if(childData.createdUser == profile.email) {
       
    joblist.push(childKey)
    document.querySelector('#root').innerHTML +=
    `
        <div class="card" style="width: 18vw;" >
            <div class="z-0">
            <img src="${urlLogo}" class="card-img-top img-fluid pt-3" alt="...">
            <div class="card-body">
                <h5 class="card-title text-truncate">${childData.job}</h5>
                <p class="card-text" id="namecpn">${childData.pos}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <i class="bi bi-cash-stack align-text-top"></i>
                    ${childData.range} triệu
                </li>
                <li class="list-group-item">
                    <i class="bi bi-hourglass-split align-text-top"></i>
                    ${childData.exp} năm
                </li>
                <li class="list-group-item">
                    <i class="bi bi-smartwatch align-text-top"></i>
                    ${childData.jobtime}
                </li>
            </ul>
            <a href="bs_homed.html" class="card-link position-absolute z-1" style="top: 0; right: 2%">
                <i class="bi bi-x-lg"></i>
            </a>
            <div class="card-body d-flex justify-content-center z-1">
                <button id="${childKey}" class="btn btn-primary card-link" onClick="reply_click(this.id)">Chỉnh sửa</button>
                <button class="btn btn-danger delete ms-3" id="${childKey}">Xóa</button>
            </div>
            </div>
        </div>
    `
    }

      // ...
    });
    sessionStorage.setItem('historyJob',
    JSON.stringify({ key : joblist}))
    let deleteButton = document.getElementsByClassName("delete")
    console.log(deleteButton)

    for (let i = 0; i <  deleteButton.length; i++) {
        deleteButton[i].addEventListener('click',(e) =>{

            var answer = window.confirm("Delete?");
            if (answer) {
                remove(ref(Database,`recruit/${deleteButton[i].id}`)).then(()=>{

                    alert('Success')
                    location.reload()
                })
                
            }
            else {
                //some code
            }
        
           


        
        
        })
        
    }
}, {
onlyOnce: true

});