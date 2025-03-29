import { useRouter, useSearchParams } from 'next/navigation'

type QueryParams = Record<string, string>

function getCurrentPath(params: QueryParams) {
    const newParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        newParams.set(key, value)
    })

    const { pathname, hash } = window.location
    return `${pathname}?${newParams.toString()}${hash}`
}

function useQueryParams() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const setQueryParams = (params: QueryParams) => {
        const currentPath = getCurrentPath(params)
        router.push(currentPath)
    }

    const addParam = (key: string, value: string) => {
        const queryParams = new URLSearchParams(window.location.search)
        queryParams.set(key, value)
        setQueryParams(Object.fromEntries(queryParams))
    }

    const replaceParam = (key: string, value: string) => {
        const queryParams = new URLSearchParams(window.location.search)
        queryParams.set(key, value)
        setQueryParams(Object.fromEntries(queryParams))
    }

    const removeParam = (key: string) => {
        const queryParams = new URLSearchParams(window.location.search)
        queryParams.delete(key)
        setQueryParams(Object.fromEntries(queryParams))
    }

    return {
        setQueryParams,
        addParam,
        replaceParam,
        removeParam,
        searchParams,
    }
}

export default useQueryParams
