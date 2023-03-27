import fs from 'fs'

const renderPage = (page, config={}) => {
    let cssLinksString = ""
    if (config.cssLinks) {
        config.cssLinks.forEach(cssLink => cssLinksString += cssLink + '\n')
    }
    const navbar = readPage('./public/components/navbar/navbar.html')
        .replace('$CSS_LINK', cssLinksString)
        .replace('$TAB_TITLE', config.tabTitle.replaceAll('-', ' '))
    const footer = readPage('./public/components/footer/footer.html').replace('$FOOTER_YEAR', `${new Date().getFullYear()} ©️`)
    
    return navbar + page + footer
}

const readPage = pagePath =>  fs.readFileSync(pagePath).toString()

export {
    renderPage,
    readPage
}
