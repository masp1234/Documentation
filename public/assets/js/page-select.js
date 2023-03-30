const renderDropdown = async () => {
    const response = await fetch(`/api/documentation`)
    const documentationFiles = await response.json()
    
    const documentationDropdown = document.getElementById('documentation-dropdown')
    documentationDropdown.innerHTML = "";

    documentationFiles.data.forEach(file => {
        const anchorElement = document.createElement('a')
        anchorElement.href = `/documentation/${file.pathName}`
        anchorElement.innerText = file.displayName
        anchorElement.classList.add('dropdown-item')
        documentationDropdown.appendChild(anchorElement)
})
}

renderDropdown()

export {
    renderDropdown
}