import React, { useState, useEffect } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router'

function PageLoadingBar() {
    const [progress, setProgress] = useState(0)
    const router = useRouter()

    useEffect(() => {
        router.events.on('routeChangeStart', (url) => { setProgress(30) })
        router.events.on('routeChangeComplete', (url) => { setProgress(100) })
        router.events.on('routeChangeError', (url) => { setProgress(100) })

        return () => {
            router.events.off('routeChangeStart', (url) => { setProgress(30) })
            router.events.off('routeChangeComplete', (url) => { setProgress(100) })
            router.events.off('routeChangeError', (url) => { setProgress(100) })
        }
    }, [router])


    return (
        <LoadingBar height={3} progress={progress} color='#28b485' onLoaderFinished={() => { }} />
    )
}

export default PageLoadingBar