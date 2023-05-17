// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getDatabase, set,ref } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

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
const auth = getAuth(app);
const reset = document.getElementById('reset');

// Hàm tăng giá trị theo thời gian
function incrPro(i, endNbr, elt) {
    if (i <= endNbr) {
        if (i == 100) {
            elt.style.width = '99%';
            elt.innerText = 'Sắp hoàn tất...';
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

reset.addEventListener('click',(e)=>{
    const email = document.getElementById('email').value;

    // Kiểm tra Email
    if (email == '') {
        document.getElementById("forget-rep").innerHTML = 'Vui lòng nhập Email'
        document.getElementById("forget-rep").classList.remove('d-none')
        return
    }
    else if (!ValidateEmail(email)) {
        document.getElementById("forget-rep").innerHTML = 'Email không hợp lệ'
        document.getElementById("forget-rep").classList.remove('d-none')
        return
    }

    // Tạo modal và thanh process bar
    process.style.display = 'block'
    process_bar.innerText = 0
    process_bar.style.width = 0
    incrPro(0, 50, process_bar)

    sendPasswordResetEmail(auth, email)
    .then(() => {
        incrPro(50, 100, process_bar)
        // Nếu tồn tại Email đã nhập -> Gửi mail thay đổi mật khẩu đến địa chỉ đó
        window.location.replace("signin.html")
        alert('Vui lòng kiểm tra Email vừa nhập')
    })
    .catch((error) => {
        incrPro(50, 100, process_bar)
        setTimeout(function() {
            process.style.display = 'none'
            // Hiển thị thông báo lỗi cho người dùng
            document.getElementById("forget-rep").innerHTML = 'Email không tồn tại'
            document.getElementById("forget-rep").classList.remove('d-none')
            // ..
        }, 350)
    });
})