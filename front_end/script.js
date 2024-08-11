let saveButton = document.getElementById('save')
let title = document.getElementById('title')
let blogText = document.getElementById('blog-text')
let startingTitleText = title.getAttribute('value')


saveButton.onclick = function(event){
    console.log(startingTitleText + 'extra random stuff')
    let titleText = ''
    if(startingTitleText === ''){
        titleText = title.value.trim().replace(/ /g, '_')
    }else{
        titleText = startingTitleText.slice(0,-4)
    }

    fetch('/savePage', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({title: encodeURIComponent(titleText), text: blogText.value})
    })
}

