import express from 'express'
import path from 'path'
import fs from 'fs'
import { renderPage, readPage } from './util/template-engine.js'

const app = express()
const PORT = 8080

app.use(express.static('public'))
app.use(express.json())


const loginPage = renderPage(readPage('./public/pages/login/login.html'), {
    tabTitle: 'Login'
})
const indexPage = renderPage(readPage('./public/pages/index/index.html'), {
    tabTitle: 'Home'
})
const adminPage = renderPage(readPage('./public/pages/admin/create-new-page.html'), {
    cssLinks: ['<link rel="stylesheet" href="/pages/admin/create-new-page.css">'],
    tabTitle: 'Admin'
})

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

app.get('/documentation/:pageName', (req, res) => {
    const pageName = req.params.pageName
    const filePath = `public/pages/documentation/${pageName}.html`
    if (!fs.existsSync(filePath)) {
        return res.status(404).send({ message: `The page with name: ${pageName} does not exist` })
    }

    return res.send(renderPage(readPage(filePath), {
        tabTitle: pageName
    }))  
})

app.post('/api/login', (req, res) => {
    const { username, password } = req.body
    if (username === 'bob' && password === "123") {
        // kan ikke redirecte med res.redirect(url), da fetchData brokker sig over, at en html fil sendt med res.sendFile ikke er valid JSON. Prøv at finde ud af hvordan
        return res.status(200).send( {message: 'Login successful'} )
    }
    else {
        return res.status(401).send({ message: 'Login failed' })
    }
})

app.post('/api/documentation', (req, res) => {
    const fileName = req.body.pageName.trim().replaceAll(' ', '-')
    const filePath = `public/pages/documentation/${fileName}.html`

    if (fs.existsSync(filePath)) {
        return res.status(418).send({ message: `A file with the name: ${fileName} already exists` })
    }

    fs.writeFile(path.resolve(filePath), req.body.pageContent, error => {
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