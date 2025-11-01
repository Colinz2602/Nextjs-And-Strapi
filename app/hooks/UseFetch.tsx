'use client'
import { useEffect, useState } from "react";

const UseFetch = <T,>(url: string) => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(url)
                const json = await res.json()

                setData(json)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        fetchData()
    }, [url])
    return { loading, error, data }
}

export default UseFetch