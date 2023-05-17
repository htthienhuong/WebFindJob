// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getDatabase, set,ref } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getStorage,  uploadBytes,ref as sRef } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const auth = getAuth();
const signUp = document.getElementById('signUp');

// Hàm tăng giá trị theo thời gian
function incrPro(i, endNbr, elt) {
    if (i <= endNbr) {
        if (i == 100) {
            elt.style.width = '100%';
            elt.innerText = 'Đang chuyển hướng...';
        }
        else {
            elt.innerText = `${i}%`;
            elt.style.width = `${i}%`;
            setTimeout(function() {
                incrPro(i + 2, endNbr, elt);
            }, 5);
        }
    }
}

// Hàm kiểm tra email
function ValidateEmail(mail) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        return true
    return false
}

const process = document.getElementById("process-modal")
const process_bar = document.getElementById("process-bar")

signUp.addEventListener('click',(e) => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var password_confirm = document.getElementById('confirm__password').value;
    var username = document.getElementById('fullname').value;

    // Kiểm tra Họ tên
    if (username == '') {
        document.getElementById("signup-rep").innerHTML = 'Vui lòng nhập Họ và tên'
        document.getElementById("signup-rep").classList.remove('d-none')
        return
    }

    // Kiểm tra Email
    if (email == '') {
        document.getElementById("signup-rep").innerHTML = 'Vui lòng nhập Email'
        document.getElementById("signup-rep").classList.remove('d-none')
        return
    }
    else if (!ValidateEmail(email)) {
        document.getElementById("signup-rep").innerHTML = 'Email không hợp lệ'
        document.getElementById("signup-rep").classList.remove('d-none')
        return
    }

    // Kiểm tra Mật khẩu
    if (password == '') {
        document.getElementById("signup-rep").innerHTML = 'Vui lòng nhập Mật khẩu'
        document.getElementById("signup-rep").classList.remove('d-none')
        return
    } 
    else if (password.length < 6 || password_confirm.length < 6 || password !=  password_confirm) {
        document.getElementById("signup-rep").innerHTML = 'Mật khẩu không hợp lệ'
        document.getElementById("signup-rep").classList.remove('d-none')
        return
    }

    // Tạo modal và thanh process bar
    process.style.display = 'block'
    process_bar.innerText = 0
    process_bar.style.width = 0
    incrPro(0, 50, process_bar)

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        incrPro(50, 100, process_bar)
        const user = userCredential.user;
        set(ref(Database,'users/'+ user.uid),{
            username : username,
            email : email,
            role : 1
        }).then(res=>{
            window.location.replace("signin.html")
        })

        // ...
        })
    .catch((error) => {
        incrPro(50, 100, process_bar)
        setTimeout(function() {
            process.style.display = 'none'
            // Hiển thị thông báo lỗi cho người dùng
            document.getElementById("signup-rep").innerHTML = 'Email đã được đăng ký'
            document.getElementById("signup-rep").classList.remove('d-none')
        }, 200)
    });
});

// Checked