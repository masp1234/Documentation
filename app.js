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
    console.log(req.body)
    const { username, password } = req.body
    if (username === 'bob' && password === "123") {
        console.log('fsdfdsfdsfsdf')
        return res.status(200).send( {message: 'login successful'} )
    }
    else {
        return res.status(400).send({ failed: true })
    }
    // console.log(req.body)
})

app.post('/api/pages', (req, res) => {
    console.log(req.body)
    return res.status(200).send( {message: 'success'} )
})

app.listen(PORT, error => {
    if (error) {
        return console.log('there was an error')
    }
    console.log(`Server is listening on port: ${PORT}`)
})