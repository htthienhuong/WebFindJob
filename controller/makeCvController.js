function saveCv(){

    const prof_exp = document.getElementById('prof_exp').value
    const phone = document.getElementById('phone').value
    const email = document.getElementById('email').value
    const locate = document.getElementById('location').value
    const edu_exp = document.getElementById('edu_exp').value
    const skill_exp = document.getElementById('skill_exp').value
    const word_exp = document.getElementById('word_exp').value
    const lang_exp = document.getElementById('lang_exp').value


    sessionStorage.setItem('cvprofile',
    JSON.stringify({
       prof_exp : prof_exp,
       phone : phone,
       email : email,
       locate : locate,
       edu_exp : edu_exp,
       skill_exp : skill_exp,
       word_exp : word_exp,
       lang_exp : lang_exp
    
    }))

    window.location.href = '../views/showCV.html'

}