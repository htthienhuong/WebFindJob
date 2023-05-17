    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
    import { getDatabase, set,ref, get , child} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
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
    
    const homepage = document.getElementById('homepage')


    const Database = getDatabase(app);
    const dbRef = ref(Database);
    const profile=JSON.parse(sessionStorage.getItem('profile'));
    
    homepage.addEventListener('click',(e)=>{

        get(child(dbRef, `users/${profile.uid}`)).then(res=>
        {
            console.log(profile.uid)
            if(res.val().role == 1){
               window.location.href = 'homed.html'
            }
            if(res.val().role == 2){
                window.location.href = 'bs_homed.html'
    
            }
        });
    

    })

