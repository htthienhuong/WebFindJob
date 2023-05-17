import { getDatabase, ref, child, get,  onValue , query, startAt,startAfter,orderByKey,endAt,limitToFirst,orderByChild,orderByValue } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";

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
const Database = ref(getDatabase(app));
let numberIndexPage = 12;

get(child(Database, `recruit/`)).then(res => {
    const lenDB=Object.keys(res.val()).length;
    var num;

    if (lenDB % numberIndexPage == 0) {
        num = lenDB / numberIndexPage
    }
    else {
        num = Math.floor(lenDB / numberIndexPage) + 1
    }

    const currentPage = (JSON.parse(sessionStorage.getItem('pageID') === null ? 1 : JSON.parse(sessionStorage.getItem('pageID'))?.pageid))

    for (let i=0; i<num; i++) {
        if (i+1 === currentPage) {
            document.querySelector('#CT_Page').innerHTML +=
            ` 
              <li class="page-item active">
                  <a id="${i+1}" class="page-link active" onClick="reply_click_button(this.id,${num})">${i+1}</a>
              </li>
            `
        }
        else {
            document.querySelector('#CT_Page').innerHTML +=
            ` 
              <li class="page-item">
                  <a id="${i+1}" class="page-link" onClick="reply_click_button(this.id,${num})" >${i+1}</a>
              </li>
            `
        }
    }
});