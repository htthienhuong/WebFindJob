const search = document.getElementById('search')
search.addEventListener('click',(e)=>{
    let tinhthanh = document.getElementById('tinh').value;
    let searchkey = document.getElementById('keysearch').value
    if(tinhthanh == "" && searchkey == "" ){

    }
    else{
        sessionStorage.setItem('placeSearch',
        JSON.stringify({placeS : tinhthanh, searchkey : searchkey}))
        window.open('../views/searchListJob.html');   
    }
})

