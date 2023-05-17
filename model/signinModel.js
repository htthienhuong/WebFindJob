// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getDatabase, set,ref, get , child} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import { getAuth,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

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

//Login with Google
const provider = new GoogleAuthProvider(app);
const google = document.getElementById('google');

//Login with Facebook
const provider1 = new FacebookAuthProvider();
const facebook = document.getElementById('facebook');

//Process modal
const process = document.getElementById("process-modal")
const process_bar = document.getElementById("process-bar")

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

// Kiểm tra dữ liệu đầu vào trước khi tải lên cơ sở dữ liệu
login.addEventListener('click',(e)=>{
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Kiểm tra Email
    if (email == '') {
        document.getElementById("signin-rep").innerHTML = 'Vui lòng nhập Email'
        document.getElementById("signin-rep").classList.remove('d-none')
        return
    }
    else if (!ValidateEmail(email)) {
        document.getElementById("signin-rep").innerHTML = 'Email không hợp lệ'
        document.getElementById("signin-rep").classList.remove('d-none')
        return
    }

    // Kiểm tra Mật khẩu
    if (password == '') {
        document.getElementById("signin-rep").innerHTML = 'Vui lòng nhập Mật khẩu'
        document.getElementById("signin-rep").classList.remove('d-none')
        return
    } 
    else if (password.length < 6) {
        document.getElementById("signin-rep").innerHTML = 'Mật khẩu tối thiểu 6 ký tự'
        document.getElementById("signin-rep").classList.remove('d-none')
        return
    }

    // Tạo modal và thanh process bar
    process.style.display = 'block'
    process_bar.innerText = 0
    process_bar.style.width = 0
    incrPro(0, 33, process_bar)
    // Xác thực và xác định vai trò của người dùng (Ứng viên hay Doanh nghiệp)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        /*sessionStorage.setItem('profile',JSON.stringify(user)).then(res=>{
          document.location.href = 'homed.html';
        })*/
        incrPro(33, 66, process_bar)
        const dbRef = ref(Database);
        get(child(dbRef, `users`)).then(res=>
        {
            const profileUser=res.val()[user?.uid]
            if(profileUser?.role == 1){
                incrPro(66, 100, process_bar)
                setTimeout(()=>{
                    // Trường hợp là Ứng viên
                    sessionStorage.setItem('profile',
                    JSON.stringify({email:profileUser?.email,userName:profileUser?.username,uid:user.uid}))
                    document.location.href = 'homed.html';
                },150)
            }
            else{
                // Trường hợp là doanh nghiệp
                incrPro(66, 100, process_bar)
                setTimeout(()=>{
                    sessionStorage.setItem('profile',
                    JSON.stringify({email:profileUser?.email,userName:profileUser?.username,uid:user.uid,namecpn : profileUser.namecpn,place : profileUser.tinhthanh}))
                    document.location.href = 'bs_homed.html';
                },150)
            }
        })
    })
    .catch((error) => {
        // Trường hợp sai email hoặc mật khẩu
        incrPro(34, 100, process_bar)

        setTimeout(function() {
            process.style.display = 'none'
            // Hiển thị thông báo kết quả đăng nhập cho người dùng
            document.getElementById("signin-rep").innerHTML = 'Email hoặc mật khẩu không đúng'
            document.getElementById("signin-rep").classList.remove('d-none')
        }, 250)
    });
});

google.addEventListener('click',(e) =>{
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(result)
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        sessionStorage.setItem('profile', JSON.stringify({
            userName:user?.displayName,
            photoURL:user?.photoURL,
            email:user?.email
        }))

        setTimeout(()=>{
            document.location.href = 'homed.html';
        },0)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log('a')
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}); 

facebook.addEventListener('click',(e) => {
    signInWithPopup(auth, provider1)
    .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
        window.location.href("homed.html");
    })
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        alert('Failed')

        // ...
    });
});
// checked