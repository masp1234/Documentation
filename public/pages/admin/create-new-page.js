import { fetchData } from "../../assets/js/util.js";


document.getElementById('new-page-submit').addEventListener('click', async () => {
    const pageName = document.getElementById('new-page-name').value
    const pageContent = document.getElementById('new-page-text').innerHTML
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

    const response = await fetchData('http://localhost:8080/api/pages', settings)
    console.log(response)
})