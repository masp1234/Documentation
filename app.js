import express from 'express'
import path from 'path'
import fs from 'fs'
import { renderPage, readPage } from './util/template-engine.js'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = 8080

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())


const loginPage = renderPage(readPage('./public/pages/login/login.html'), {
    tabTitle: 'Login'
})

app.get('/', (req, res) => {
    res.status(200).send(renderPage(readPage('./public/pages/index/index.html'), {
        tabTitle: 'Home',
        cookie: req.cookies['logged-in cookie']
    }))
})

app.get('/login', (req, res) => {
    res.status(200).send(loginPage)
})

app.get('/logout', (req, res) => {
    res.clearCookie('logged-in cookie')
    res.redirect('/')
})

app.get('/admin', (req, res) => {
    res.status(200).send(renderPage(readPage('./public/pages/admin/create-new-page.html'), {
        cssLinks: ['<link rel="stylesheet" href="/pages/admin/create-new-page.css">'],
        tabTitle: 'Admin',
        cookie: req.cookies['logged-in cookie']
    }))
})

// returns pathName used to navigate to an endpoint and a displayName to display in the dropdown menu
app.get('/api/documentation', (req, res) => {
    fs.readdir('public/pages/documentation/', (error, files) => {
        if (error) return res.status(500).send({ msg: error.message })
        
        const fileNames = files.map(fileName => {
            const slicedFileName = fileName.slice(0, -5)
            return {
                pathName: slicedFileName,
                displayName: slicedFileName.replaceAll('-', ' ')
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

    return res.status(200).send(renderPage(readPage(filePath), {
        tabTitle: pageName,
        cssLinks: ['<link rel="stylesheet" href="/assets/css/documentation.css">'],
        cookie: req.cookies['logged-in cookie']
    }))  
})

app.post('/api/login', (req, res) => {
    const { username, password } = req.body
    if (username === 'bob' && password === "123") {
        // kan ikke redirecte med res.redirect(url), da fetchData brokker sig over, at en html fil sendt med res.sendFile ikke er valid JSON. Prøv at finde ud af hvordan
        res.cookie('logged-in cookie', 'random-value', {
            maxAge: 1000 * 60 * 120
        })
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
        return res.status(409).send({ message: `A file with the name: ${fileName} already exists` })
    }
    const newPage = `<div id="documentation-container">
                        ${req.body.pageContent}
                     </div>`

    fs.writeFile(path.resolve(filePath), newPage, error => {
        if (error) return res.status(500).send({ message: 'Could not write to file' })
    })
    return res.status(200).send( {message: `${fileName} was created`} )
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