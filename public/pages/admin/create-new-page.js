import { fetchData, BASE_URL } from "../../assets/js/util.js"

document.getElementById('new-page-submit').addEventListener('click', async () => {
    const feedbackElement = document.getElementById('feedback')
    const pageName = document.getElementById('new-page-name').value
    
    if (pageName.length <= 0) {
        feedbackElement.innerText = 'The file needs a name'
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

    const response = await fetchData(`${BASE_URL}/api/pages`, settings)
    feedbackElement.innerText = response.message
})