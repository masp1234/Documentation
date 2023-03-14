import { fetchData, BASE_URL } from "../../assets/js/util.js"

const documentationFiles = await fetchData(`${BASE_URL}/api/documentation`)

const documentationDropdown = document.getElementById('documentation-select')

documentationFiles.data.forEach(file => {
    const optionElement = document.createElement('option')
    optionElement.value = `${BASE_URL}/documentation/${file.pathName}`
    optionElement.innerText = file.displayName
    documentationDropdown.appendChild(optionElement)
})

documentationDropdown.addEventListener('change', () => {
    window.location.href = documentationDropdown.value
})