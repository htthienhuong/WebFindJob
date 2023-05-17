function reply_click(clicked_id)
{
    sessionStorage.setItem('job',
    JSON.stringify({id:clicked_id}))
    window.open('detailJobForEdit.html');
}