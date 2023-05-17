function check() {
    if ($('#password').val().length < 6) {
        $('#messagepwd').css("color", "blue")
        $('#messagepwd').html('<small><b> Mật khẩu tối thiểu 6 ký tự</b></small>')
    } 
    else {
        $('#messagepwd').html('')
        if ($('#confirm__password').val() != '') {
            if ($('#password').val() == '') {
                $('#message').css("color", "orange")
                $('#message').html('<small><b><i class="bi bi-arrow-up-left align-text-top"></i> Nhập mật khẩu gốc</b></small>')
            } else if ($('#password').val() === $('#confirm__password').val()) {
                $('#message').css("color", "green")
                $('#message').html('<small><b><i class="bi bi-check2 align-text-top"></i> Trùng khớp</b></small>')
                } 
            else {
                $('#message').css("color", "red")
                $('#message').html('<small><b><i class="bi bi-x align-text-top"></i> Không trùng khớp</b></small>')
            }            
        }
    }
}

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
// Checked