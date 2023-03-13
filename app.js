import express from 'express'
import path from 'path'

const app = express()
const PORT = 8080


app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve('public/pages/index/index.html'))
})

app.get('/login', (req, res) => {
    res.status(200).sendFile(path.resolve('public/pages/login/login.html'))
})

app.get('/admin', (req, res) => {
    res.status(200).sendFile(path.resolve('public/pages/admin/create-new-page.html'))
})

app.post('/api/login', (req, res) => {
    const { username, password } = req.body
    if (username === 'bob' && password === "123") {
        // kan ikke redirecte med res.redirect(url), da fetchData brokker sig over, at en html fil sendt med res.sendFile ikke er valid JSON. Prøv at finde ud af hvordan
        return res.status(200).send( {message: 'Login successful', redirectURL: '/admin'} )
        
    }
    else {
        return res.status(401).send({ message: 'Login failed' })
    }
})

app.listen(PORT, error => {
    if (error) {
        return console.log('there was an error')
    }
    console.log(`Server is listening on port: ${PORT}`)
})