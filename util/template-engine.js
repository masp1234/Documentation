import fs from 'fs'



const renderPage = (page, config={}) => {
    const navbar = readComponent('./public/components/navbar/navbar.html')


    const footer = readComponent('./public/components/footer/footer.html')
    




    return navbar + page + footer
}


const readPage = pagePath =>  fs.readFileSync(pagePath).toString()


const readComponent = pagePath =>  fs.readFileSync(pagePath).toString()


export {
    renderPage,
    readPage
}