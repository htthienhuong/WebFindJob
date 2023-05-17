const btn_collap_tutorial = document.getElementById('btn-collap-tutorial');
const btn_collap_user = document.getElementById('btn-collap-user');

btn_collap_tutorial.onclick = function() {
    if (btn_collap_tutorial.classList.contains('box-open'))
        btn_collap_tutorial.classList.remove('box-open')
    else 
        btn_collap_tutorial.classList.add('box-open')
        $("element-selector").collapse('hide')
}

if (btn_collap_user) {
    btn_collap_user.onclick = function() {
        if (btn_collap_user.classList.contains('box-open'))
            btn_collap_user.classList.remove('box-open')
        else 
            btn_collap_user.classList.add('box-open')
    }
}

let toast_id = 0
let toast_from = 0
function how_rep(e) {
    document.querySelector('#toast-root').innerHTML +=`
    <div id="liveToast-${toast_id}" class="toast show border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <i class="bi bi-briefcase-fill align-text-top me-1 text-pink-medium"></i>
            <strong class="me-auto ps-1">Thông báo</strong>
            <small class="fst-italic">Vừa mới</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body" id="toast-page">
            Trang <b> ${e.getAttribute("value")} </b> đang được xây dựng
        </div>
    </div>
    `
    toast_id++
    let toast_list = setInterval(() => {
        if (toast_from < toast_id) {
            document.querySelector(`#liveToast-${toast_from}`).innerHTML = ""
        }
        toast_from++
        clearInterval(toast_list)
    }, 2500);
}

for (let i=0; i<12; i++) {
    document.querySelector('#root').innerHTML +=
    `
        <div class="col-lg-4 col-md-6 col-12" id='placeholder-${i}' value=${i}>
            <div class="card btn card-hover">
                <a class="stretched-link z-0"></a>
                <div class="row g-0">
                    <div class="col-3 d-flex p-2 justify-content-center align-items-center overflow-hidden placeholder-glow">
                        <div src="" class="rounded border placeholder w-100 h-100" alt="..."></div>
                    </div>
                    <div class="col-9">
                        <div class="card-body ps-md-1 text-left placeholder-glow">
                            <h5 class="card-title fs-6 placeholder px-5"></h5>
                            <p class="card-text placeholder px-5 d-block"></p>
                        </div>
                    </div>
                </div>
                
                <div class="row pb-2 ps-2 text-left">
                    <div class="col d-lg-none placeholder-glow pt-1">
                        <div class="badge-wrapper" id="badgeWrapper">
                            <span class="badge bg-secondary placeholder">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span class="badge bg-secondary placeholder">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </div>
                    </div>
                    <div class="col d-none d-lg-flex overflow-hidden placeholder-glow pt-lg-1 pt-md-5">
                        <span class="badge bg-secondary placeholder">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span class="badge bg-secondary placeholder">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </div>
                </div>
            </div>
        </div>
    `
}
