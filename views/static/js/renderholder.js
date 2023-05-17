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
                
                <div class="row pb-2 ps-2">
                    <div class="col d-lg-none placeholder-glow pt-1">
                        <div class="badge-wrapper" id="badgeWrapper">
                            <span class="badge bg-secondary placeholder">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span class="badge bg-secondary placeholder">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </div>
                    </div>
                    <div class="col d-none d-lg-flex overflow-hidden placeholder-glow pt-lg-1 pt-md-5">
                        <span class="badge bg-secondary placeholder">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span class="badge bg-secondary placeholder ms-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </div>
                </div>
            </div>
        </div>
    `
}