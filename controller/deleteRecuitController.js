function reply_delete(clicked_id)
{
    console.log(clicked_id)
    sessionStorage.setItem('delete',
    JSON.stringify({id:clicked_id}))


}

