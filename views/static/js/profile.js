const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
const togglePasswordConfirm = document.querySelector('#togglePasswordComfirm');
const passwordConfirm = document.querySelector('#confirm__password');

togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

togglePasswordConfirm.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = passwordConfirm.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordConfirm.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
})

const btn_collap_user = document.getElementById('btn-collap-user');

if (btn_collap_user) {
    btn_collap_user.onclick = function() {
        if (btn_collap_user.classList.contains('box-open'))
            btn_collap_user.classList.remove('box-open')
        else 
            btn_collap_user.classList.add('box-open')
    }
}