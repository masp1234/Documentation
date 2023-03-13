const fetchData = async (url, settings) => {
    const response = await fetch(url, settings)
    const data = await response.json()
    return data
}


export {
    fetchData
}