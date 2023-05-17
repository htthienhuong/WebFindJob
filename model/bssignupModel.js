// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getDatabase, set,ref } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, sendSignInLinkToEmail  } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
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
const storage = getStorage(app);

function ValidateEmail(mail) 
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        return true
    return false
}

signUp.addEventListener('click',(e) => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let username = document.getElementById('fullname').value;
    let namecpn = document.getElementById('namecpn').value;
    let tinhthanh = document.getElementById('tinh').value;
    let address = document.getElementById('address').value;
    let describe = document.getElementById('describe').value;
    let comfirm_pwd = document.getElementById('confirm__password').value
    let checkbox = document.getElementById('check-agree').checked
    const file = document.querySelector("#photo").files[0];

    // Kiểm tra dữ liệu đầu vào
    if (username == '') {
        document.getElementById("bs-signup-rep").innerHTML = 'Vui lòng nhập Họ và tên'
        document.getElementById("bs-signup-rep").classList.remove('d-none')
        $('html, body').animate({scrollTop: 0}, 'fast');
        return
    } 
    else {
        if (!ValidateEmail(email)) {
            document.getElementById("bs-signup-rep").innerHTML = 'Email không hợp lệ'
            document.getElementById("bs-signup-rep").classList.remove('d-none')
            $('html, body').animate({scrollTop: 0}, 'fast');
            return
        }
        else {
            if (password.length < 6 || comfirm_pwd.length < 6 || password != comfirm_pwd) {
                document.getElementById("bs-signup-rep").innerHTML = 'Mật khẩu không hợp lệ'
                document.getElementById("bs-signup-rep").classList.remove('d-none')
                $('html, body').animate({scrollTop: 0}, 'fast');
                return
            }
            else {
                if (namecpn == '') {
                    document.getElementById("bs-signup-rep").innerHTML = 'Vui lòng nhập Tên công ty'
                    document.getElementById("bs-signup-rep").classList.remove('d-none')
                    $('html, body').animate({scrollTop: 0}, 'fast');
                    return
                }
                else {
                    if (tinhthanh == '' || address == '') {
                        document.getElementById("bs-signup-rep").innerHTML = 'Vui lòng nhập Địa chỉ công ty'
                        document.getElementById("bs-signup-rep").classList.remove('d-none')
                        $('html, body').animate({scrollTop: 0}, 'fast');
                        return
                    }
                    else {
                        if (describe.length < 50) {
                            document.getElementById("bs-signup-rep").innerHTML = 'Vui lòng nhập Mô tả doanh nghiệp chi tiết hơn'
                            document.getElementById("bs-signup-rep").classList.remove('d-none')
                            $('html, body').animate({scrollTop: 0}, 'fast');
                            return
                        }
                        else {
                            if (!checkbox) {
                                document.getElementById("bs-signup-rep").innerHTML = 'Vui lòng nhập chấp thuận Điều khoản của chúng tôi'
                                document.getElementById("bs-signup-rep").classList.remove('d-none')
                                $('html, body').animate({scrollTop: 0}, 'fast');
                                return
                            }
                        }
                    }
                }
            }
        }
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential)
        const metadata = {
            contentType: file.type,
            size : 100 * 100
        };
        const storageRef = sRef(storage, email);
        const uploadTask = uploadBytes(storageRef, file, metadata);
        // Signed in 
        const user = userCredential.user;
        set(ref(Database,'users/'+ user.uid),{
        
            username : username,
            email : email,
            namecpn : namecpn,
            tinhthanh : tinhthanh,
            address : address,
            describe : describe,
            role : 2

        }).then(res => {
            console.log(res)
            alert('Success')
            window.location.replace("signin.html")
        })
        .catch(err => {
            console.log(err)
        })
        // ...
    })
    .catch((error) => {
        console.log("test",error)
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
});
