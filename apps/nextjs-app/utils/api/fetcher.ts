export const fetcher = async (url: string, method: string, body: string, json = true) => {
    const response = await fetch(url, {
        method,
        ...(body && {body: JSON.stringify(body)}),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) throw new Error(`API Error: ${response.statusText}`)

    if (json) return await response.json()
}