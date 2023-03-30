import { renderDropdown } from "../../assets/js/page-select.js"

document.getElementById('new-page-submit').addEventListener('click', async () => {
    const feedbackElement = document.getElementById('feedback')
    const pageName = document.getElementById('new-page-name').value
    
    // lav en metode der gør dette, men både ved success og fejl
    if (pageName.length <= 0) {
        feedbackElement.innerText = 'The file needs a name'
        setTimeout(() => {
            feedbackElement.innerText = ""
        }, 3500)
        return
        
    }
    const pageContent = document.getElementById('new-page-text').value
    console.log(pageName, pageContent)
    
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pageName: pageName,
            pageContent: pageContent
        })
    }

    const response = await fetch('/api/documentation', settings)
    const data = await response.json();
    // TODO Reloader hele siden, men måske man kunne nøjes med Documentation dropdown?
    if (response.ok) await renderDropdown()
    //window.location.replace('/admin')
    feedbackElement.innerText = data.message
    
})