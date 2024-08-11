let saveButton = document.getElementById('save')
let titleText = document.getElementById('title')
let blogText = document.getElementById('blog-text')


saveButton.onclick = function(event){
    fetch('/savePage', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({title: encodeURIComponent(titleText.value.trim().replace(/ /g, '_')), text: blogText.value})
    })
    
    console.log(titleText)
    console.log(blogText)
}

