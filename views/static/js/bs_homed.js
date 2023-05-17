const btn_collap_tutorial = document.getElementById('btn-collap-tutorial');

btn_collap_tutorial.onclick = function() {
    if (btn_collap_tutorial.classList.contains('box-open'))
        btn_collap_tutorial.classList.remove('box-open')
    else 
    btn_collap_tutorial.classList.add('box-open')
}