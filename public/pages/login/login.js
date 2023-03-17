import { BASE_URL } from '../../assets/js/util.js'

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
    const response = await fetch(`${BASE_URL}/api/login`, settings)
    const data = await response.json()
    if (response.ok) {
        window.location.replace('/admin')
    }
    else {
        console.log(data.message)
    }
    

})