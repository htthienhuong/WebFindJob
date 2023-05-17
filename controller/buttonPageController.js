function reply_click_button(clicked_id,num)
{   
    console.log("a")
    sessionStorage.setItem('pageID',
    JSON.stringify({pageid:clicked_id}))
    for(let i=1;i<=num;i++){
        document.getElementById(i).className = 'page-link';
    }

    document.getElementById(clicked_id).className = 'page-link active';
    location.reload()
}