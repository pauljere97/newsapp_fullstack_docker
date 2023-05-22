const baseUrl = 'http://127.0.0.1:8000/api/'

export const get = async (path) => {
    const res = await fetch(baseUrl + path)
    return await res.json()
}
export const post = async (path, payload, cookie = null) => {
    const res = await fetch(baseUrl + path, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookie}`
        },
        body: JSON.stringify(payload)
    })
    return await res.json()
}