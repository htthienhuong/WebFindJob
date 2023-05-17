import { getDatabase, ref, child, get,  onValue , query, equalTo,orderByKey,endAt,limitToFirst,orderByChild,orderByValue } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
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
const placeSearch=JSON.parse(sessionStorage.getItem('placeSearch'))

let db;
document.getElementById('keysearch').value = placeSearch.searchkey 
document.getElementById('tinh').innerText = placeSearch.placeS
document.getElementById('tinh').value = placeSearch.placeS
var id_holder = 0;
if(placeSearch.placeS == ""){
    db = ref(Database, "recruit/")
    const storage = getStorage(app);
    onValue(db, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            if(childData.job.toLowerCase().includes(placeSearch.searchkey.toLowerCase())){

                let place = childData.place
                place = place.replace('Tỉnh ', '')
                place = place.replace('Thành phố ', '')
                getDownloadURL(Rref(storage, childData.createdUser))
                .then((url) => {
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
    });
    // Xóa các card holder dư
    if (id_holder < 12)
    for (let i=id_holder; i<12; i++) {
        document.querySelector('#placeholder-'+i).style.display = 'none'
    }
}, {
    onlyOnce: true
});
}

if(placeSearch.searchkey == ""){
    db = query(ref(Database, "recruit/"),orderByChild('place'),equalTo(placeSearch.placeS))
    const storage = getStorage(app);
    onValue(db, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();

            console.log(childData)

            // // Xử lý chuỗi tên tỉnh/thành
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
            // ...
        });
        // Xóa các card holder dư
        if (id_holder < 12)
            for (let i=id_holder; i<12; i++) {
                document.querySelector('#placeholder-'+i).style.display = 'none'
            }
    }, {
        onlyOnce: true
    });
}
else{
    db = query(ref(Database, "recruit/"),orderByChild('place'),equalTo(placeSearch.placeS))
    const storage = getStorage(app);
    onValue(db, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            
            if(childData.job.toLowerCase().includes(placeSearch.searchkey.toLowerCase())){

                let place = childData.place
                place = place.replace('Tỉnh ', '')
                place = place.replace('Thành phố ', '')
            getDownloadURL(Rref(storage, childData.createdUser))
            .then((url) => {
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
                                <span class="badge bg-secondary ms-2">${place}</span>
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
    });
    // Xóa các card holder dư
    if (id_holder < 12)
    for (let i=id_holder; i<12; i++) {
        document.querySelector('#placeholder-'+i).style.display = 'none'
    }
    }, {
    onlyOnce: true
    });
}

const search = document.getElementById('search')

search.addEventListener('click',(e)=>{

    let tinhthanh = document.getElementById('tinh').value;
    let searchkey = document.getElementById('keysearch').value
    
    sessionStorage.setItem('placeSearch',
        JSON.stringify({placeS : tinhthanh, searchkey : searchkey}))

    location.reload()


})