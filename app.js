import express from 'express'
import path from 'path'
import fs from 'fs'
import { renderPage, readPage } from './util/template-engine.js'

const app = express()
const PORT = 8080

app.use(express.static('public'))
app.use(express.json())


const loginPage = renderPage(readPage('./public/pages/login/login.html'))
const indexPage = renderPage(readPage('./public/pages/index/index.html'))
const adminPage = renderPage(readPage('./public/pages/admin/create-new-page.html'))

app.get('/', (req, res) => {
    res.status(200).send(indexPage)
})

app.get('/login', (req, res) => {
    res.status(200).send(loginPage)
})

app.get('/admin', (req, res) => {
    res.status(200).send(adminPage)
})

app.get('/api/documentation', (req, res) => {
    fs.readdir('public/pages/documentation/', (error, files) => {
        // returns pathName used to navigate to an endpoint and a displayName to display in the dropdown menu
        const fileNames = files.map(fileName => {
            return {
                pathName: fileName.slice(0, -5),
                displayName: fileName.replaceAll('-', ' ').slice(0, -5)
            }
        })
        res.status(200).send({ data: fileNames })
    })
})

// TODO Skal måske slet ikke bruges
app.get('/documentation', (req, res) => {
    return res.status(200).sendFile(path.resolve('public/pages/documentation-home/documentation.html'))
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
})

app.post('/api/pages', (req, res) => {
    const { pageContent } = req.body
    const pageName = req.body.pageName.trim().replaceAll(' ', '-')
    const filePath = `public/pages/documentation/${pageName}.html`
    if (fs.existsSync(filePath)) return res.status(418).send( {message: `A file with the name: ${pageName} already exists`} )

    const template = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="../../assets/css/main.css">
                <title>Document</title>
            </head>
            <body>
            <header>
                <nav>
                    <a href="/login">Log in</a>
                    <a href="/documentation">Documentation</a>
                    <select id="documentation-select">
                        <option selected disabled hidden>Pages</option>

                    </select>
                </nav>
            </header>
            ${pageContent}
            <script src="../../assets/js/page-select.js" type="module"></script>
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

export {
    app
}