import { fetchData, BASE_URL } from "./util.js"

const documentationFiles = await fetchData(`${BASE_URL}/api/documentation`)

const documentationDropdown = document.getElementById('documentation-dropdown')

documentationFiles.data.forEach(file => {
    const anchorElement = document.createElement('a')
    anchorElement.href = `${BASE_URL}/documentation/${file.pathName}`
    anchorElement.innerText = file.displayName
    anchorElement.classList.add('dropdown-item')
    documentationDropdown.appendChild(anchorElement)
})