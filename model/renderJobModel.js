import { getDatabase, ref, child, get,  onValue , query, startAt,startAfter,orderByKey,endAt,limitToFirst,orderByChild,orderByValue } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
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
const profile=JSON.parse(sessionStorage.getItem('profile'))
const currentPage = (
    JSON.parse(sessionStorage.getItem('pageID') === null ? 1 : JSON.parse(sessionStorage.getItem('pageID'))?.pageid))

const dbRef = query(ref(getDatabase(),'recruit'), orderByKey('range'));
const dbRef1 = query(dbRef, startAfter('-NTAOOh-3GOs29hwbLx3'));
const dbRef2 = query(dbRef1,limitToFirst(3))

//Get image
const storage = getStorage(app);
const numberIndexPage = 12;
var urlLogo;
var id_holder = 0;

onValue(dbRef, (snapshot) => {
    const currentIndexPage = numberIndexPage * currentPage;
    const prevIndexPage = numberIndexPage * (currentPage - 1);

    let number = 0;
    snapshot.forEach((childSnapshot) => {
        if (prevIndexPage <= number && number < currentIndexPage) {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();

        // Xử lý chuỗi tên tỉnh/thành
        let place = childData.place
        place = place.replace('Tỉnh ', '')
        place = place.replace('Thành phố ', '')
    
        getDownloadURL(Rref(storage, childData.createdUser))
        .then((url) => {
        // `url` is the download URL for bussiness logo
            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const blob = xhr.response;
            };
            xhr.open('GET', url);
            
            document.querySelector(`#placeholder-${id_holder}`).outerHTML =
            ` 
                <div class="col-lg-4 col-md-6 col-12" id="${childKey}" onClick="reply_click(this.id)">
                    <div class="card btn card-hover" id="${childKey}">
                        <a class="stretched-link font-italic small text-secondary text-decoration-none z-0"></a>
                        <div class="row g-0">
                            <div class="col-3 d-flex p-2 justify-content-start align-items-center overflow-hidden">
                                <img src="${url}" class="img-fluid rounded border w-100" style="height: 75px" alt="...">
                            </div>
                            <div class="col-9">
                                <div class="card-body ps-md-1 text-left">
                                    <h5 class="card-title text-truncate fs-6 fw-bolder mb-0 pb-1">${childData.job}</h5>
                                    <p class="card-text text-truncate">${childData.namecpn}</p>
                                </div>
                            </div>
                        </div>
            
                        <div class="row pb-2 ps-2 text-left">
                            <div class="col d-lg-none">
                                <div class="badge-wrapper pt-1">
                                    <span class="badge bg-secondary">${childData.range} triệu</span>
                                    <span class="badge bg-secondary">${place}</span>
                                </div>
                            </div>
                            <div class="col d-none d-lg-flex overflow-hidden pt-1">
                                <span class="badge bg-secondary">${childData.range} triệu</span>
                                <span class="badge bg-secondary">${place}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            id_holder++;
            })
            .catch((error) => {
            // Handle any errors
            }); 
        }
        // ...
        number++;
    });
    // Xóa các card holder dư
    if (id_holder < 12)
    for (let i=id_holder; i<12; i++) {
        document.querySelector('#placeholder-'+i).style.display = 'none'
    }
}, {
    onlyOnce: true
});