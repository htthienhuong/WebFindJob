import { getDatabase, ref, child, get,  onValue , query, startAt,startAfter,orderByKey,endAt,limitToFirst,orderByChild,orderByValue } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getStorage, ref as Rref , getDownloadURL,listAll } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";
// export function renderJob(num) 

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
const jobCv=JSON.parse(sessionStorage.getItem('historyJob'))
const storage = getStorage(app);

for(let i = 0;i<Object.keys(jobCv.key).length; i++){
    const listRef = Rref(storage, `jobCv/${jobCv.key[i]}`);
    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        if(Object.keys(res.items).length != 0){
            let jobid;
            let cv = [];
   
           res.items.forEach((itemRef) => {
               // All the items under listRef.
               jobid = jobCv.key[i]
               cv.push(itemRef.name)
             });
             const dbRef = ref(getDatabase(app), `recruit/${jobid}`);
             onValue(dbRef, (snapshot) => {
                
                document.querySelector('#rootCv').innerHTML += ` 
                <div class="row m-auto border-pink">
                <div class="col-12 p-0 col-md-3 text-pink-strong bg-secondary-subtle p-md-5 d-flex align-items-center justify-content-center">
                    <h4 class="fst-italic text-left">${snapshot.val().job}</h4>
                    </div>
                    <div class="col-12 col-md-9 p-0 border-start-pink">
                        <div class="table-responsive" style="max-height: 300px;">
                            <table class="table table-hover table table-striped table-hover-tr-italic" >
                                <caption class="text-center">Hết</caption>
                                <thead>
                                    <tr class="sticky-top bg-warning z-0">
                                        <th scope="col" class="border-top-0">STT</th>
                                        <th scope="col" class="border-top-0">Họ và tên</th>
                                        <th scope="col" class="border-top-0">Email</th>
                                        <th scope="col" class="border-top-0">Link CV</th>
                                    </tr>
                                </thead>
                                <tbody id="${jobid}">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                `
                for(let j = 0; j<Object.keys(cv).length; j++){

                  getDownloadURL(Rref(storage, `jobCv/${jobCv.key[i]}/${cv[j]}`))
                    .then((url) => {
                  
                      const xhr = new XMLHttpRequest();
                      xhr.responseType = 'blob';
                      xhr.onload = (event) => {
                        const blob = xhr.response;
                      };
                      xhr.open('GET', url);
               
                      const dbRef2 = ref(getDatabase(app), `users/${cv[j]}`);

                      onValue(dbRef2, (snapshot1) => {
                        console.log(j)
    
                        document.querySelector(`#${jobid}`).innerHTML += `
                                  <tr>
                                        <td>${j}</td>
                                        <td>${snapshot1.val().username}</td>
                                        <td>${snapshot1.val().email}</td>
                                        <td ><a href=""  onClick="window.open('${url}')">Link CV</a></td>
                                    </tr>
                        `
                      }, 
                      {
                          onlyOnce: true
                      });      
                    })
                    .catch((error) => {
                      // Handle any errors
                    });
                }        
            }, 
            {
                onlyOnce: true
            });
        }   
        let element = document.getElementById("loading-page");
        element.classList.remove("loading-page");
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
    }




