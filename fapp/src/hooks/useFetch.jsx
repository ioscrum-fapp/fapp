import { useState, useEffect } from 'react'

const useFetchJson = (url) => {
    const [json, setJson] = useState(null)
    const [isFinished, setIsFinished] = useState(false)
    const [error, setError] = useState(null)

    // console.warn(url)

    useEffect(() => {
        const abortCont = new AbortController()

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(async res => {
                    if (!res.ok) { // error coming back from server
                        throw Error('response not ok!')
                    }
                    return await res.json()
                })
                .then(result => {
                    setIsFinished(true)
                    setJson(result)
                    setError(null)
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        // console.warn('Fetch cancelled')
                    } else {
                        setIsFinished(true)
                        setError(err.message)
                        console.warn(err)
                    }
                })
        }, 0) // 500) // 2000) // do testowania wczytywania

        // abort the fetch
        return () => { abortCont.abort() }
    }, [url])

    // console.warn(json)

    return { json, isFinished, error }
}

export default useFetchJson