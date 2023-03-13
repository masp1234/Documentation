import { fetchData } from '../../assets/js/util.js'

document.getElementById('login-button').addEventListener('click', async () => {
    const username = document.getElementById('login-username').value
    const password = document.getElementById('login-password').value
    
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }
    const response = await fetchData('http://localhost:8080/api/login', settings)
    if (response.redirectURL) {
        window.location.href = response.redirectURL
    }
    else {
        console.log(response.message)
    }
    

})