import fs, { read } from 'fs'

const renderPage = (page, config={}) => {
    let cssLinksString = ""
    let navbar = ""

    if (config.cssLinks) {
        config.cssLinks.forEach(cssLink => cssLinksString += cssLink + '\n')
    }
    if (config.cookie === 'random-value') {
        navbar = readPage('./public/components/navbar/logged-in-navbar.html')
    }
    else {
        navbar = readPage('./public/components/navbar/navbar.html')
    }

    navbar = navbar.replace('$CSS_LINK', cssLinksString).replace('$TAB_TITLE', config.tabTitle.replaceAll('-', ' '))
        
    const footer = readPage('./public/components/footer/footer.html').replace('$FOOTER_YEAR', `${new Date().getFullYear()} ©️`)
    
    return navbar + page + footer
}

const readPage = pagePath =>  fs.readFileSync(pagePath).toString()

export {
    renderPage,
    readPage
}
