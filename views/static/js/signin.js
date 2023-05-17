const togglePassword = document.querySelector('#togglePassword');
const password_1 = document.querySelector('#password');

const togglePasswordConfirm = document.querySelector('#togglePassword_1');

togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password_1.getAttribute('type') === 'password' ? 'text' : 'password';
    password_1.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
})
