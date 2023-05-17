const signout = document.getElementById('signout')
const signout1 = document.getElementById('signout1')

signout.addEventListener('click',(e) => {
    sessionStorage.removeItem('profile');
    window.location.replace('../index.html')
});

signout1.addEventListener('click',(e) => {
    sessionStorage.removeItem('profile');
    window.location.replace('../index.html')
});