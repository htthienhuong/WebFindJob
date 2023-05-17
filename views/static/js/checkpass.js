function check() {
    if ($('#confirm__password').val() != '') {
        if ($('#password').val() == '') {
            $('#message').css("color", "orange")
            $('#message').html('<b><i class="bi bi-arrow-up-left align-text-bottom"></i>Vui lòng nhập ô mật khẩu phía trên</b>')
        } else if ($('#password').val() === $('#confirm__password').val()) {
            $('#message').css("color", "green")
            $('#message').html('<b><i class="bi bi-check2 align-text-bottom"></i>Trùng khớp</b>')
            } 
        else {
            $('#message').css("color", "red")
            $('#message').html('<b><i class="bi bi-x align-text-bottom"></i>Không trùng khớp</b>')
        }            
    }
}