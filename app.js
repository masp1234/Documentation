import express from 'express'
import path from 'path'
import fs from 'fs'

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

app.get('/api/documentation', (req, res) => {
    // TODO make a fetch from frontend that creates a dropdown menu with these files
    fs.readdir('public/pages/documentation/', (error, files) => {
        // ændrer '-' til ' ' og fjerne .html extenstion fra filerne, så de kan bruges i frontend i en dropdown
        const fileNames = files.map(file => file.replaceAll('-', ' ').slice(0, -5))
        res.status(200).send({ data: fileNames })
    })
})

app.get('/documentation/:pageName', (req, res) => {
    const pageName = req.params.pageName
    const filePath = `public/pages/documentation/${pageName}.html`
    if (!fs.existsSync(filePath)) {
        return res.status(404).send({ message: `The page with name: ${pageName} does not exist` })
    }

    return res.sendFile(path.resolve(filePath))   
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
    // console.log(req.body)
})

app.post('/api/pages', (req, res) => {
    const { pageContent } = req.body
    const pageName = req.body.pageName.replaceAll(' ', '-')
    const filePath = `public/pages/documentation/${pageName}.html`
    if (fs.existsSync(filePath)) return res.status(418).send( {message: `A file with the name: ${pageName} already exists`} )

    const template = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
            ${pageContent}
            </body>
            </html>`

    fs.writeFile(path.resolve(filePath), template, error => {
        if (error) {
            console.log(error)
        }
    })
    return res.status(200).send( {message: 'success'} )
})

app.listen(PORT, error => {
    if (error) {
        return console.log('there was an error')
    }
    console.log(`Server is listening on port: ${PORT}`)
})