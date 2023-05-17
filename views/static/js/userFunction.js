import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getDatabase, set,ref, get , child} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import { getStorage, ref as sref , getDownloadURL} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";
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
const Database = getDatabase(app);
const dbRef = ref(Database);
const profile=JSON.parse(sessionStorage.getItem('profile'));
console.log(profile)
    get(child(dbRef, `users/${profile.uid}`)).then(res=>
    {
        if(res.val().role == 1){
            document.querySelector('#inf').innerHTML +=`
            <img src="./static/img/user_default.png" id="img" style="width: 50px;" type="button" aria-haspopup="true" aria-expanded="false" class="img-fluid border border-4 rounded-circle dropdown-toggle" data-bs-toggle="dropdown"></img>
            <ul class="dropdown-menu text-right dropdown-menu-end mt-1 border border-4">
                <li><h6 class="dropdown-header">Xin chào <mark class="username"> ${profile.userName}</mark> </h6></li>
                <li><a class="dropdown-item" href="profile.html">Hồ sơ</a></li>
                <li><a class="dropdown-item" href="fav_job.html">Bài đăng đã lưu</a></li>
                <li><a class="dropdown-item" href="createCV.html">Tạo CV</a></li>
                <li><a class="dropdown-item" href="../index.html" style="cursor: pointer;">Đăng xuất</a></li>
            </ul>
            `
        }
        if(res.val().role == 2){
            getDownloadURL(sref(storage, profile.email))
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
        
        document.querySelector('#inf').innerHTML +=`    <img  src='${url}' style="width: 50px;" type="button" aria-haspopup="true" aria-expanded="false" class="img-fluid border border-4 rounded-circle dropdown-toggle" data-bs-toggle="dropdown"></img>
        <ul class="dropdown-menu text-right dropdown-menu-end mt-1 border border-4">
        <li><h6 class="dropdown-header">Xin chào <mark class="username">Nguyen Van A</mark> </h6></li>
        <li><a class="dropdown-item" href="bs_profile.html">Hồ sơ</a></li>
        <li><a class="dropdown-item" href="recruit.html">Đăng tin tuyển dụng</a></li>
        <li><a class="dropdown-item" href="bs_history.html">Quản lý bài đăng</a></li>
        <li><a class="dropdown-item" id="signout" style="cursor: pointer;">Đăng xuất</a></li>`
        
        for(let i=0;i<document.getElementsByClassName('username').length;i++){
            document.getElementsByClassName('username')[i].innerText=profile.userName
        }
    })
    .catch((error) => {
    // Handle any errors
    });
        }
});



