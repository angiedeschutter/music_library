import React, { Suspense } from 'react'
import { useState } from 'react'
import Spinner from "./Spinner"
import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'
const GalleryItem = React.lazy(() => import('./GalleryItem'))

export default function Gallery() {
    const data = useContext(DataContext)

    let [view, setView] = useState(false)
    const galleryItems = data.map((item, index) => {
        return <GalleryItem item={item} key={index} />
    })

    return (
        <div>
            {galleryItems}
        </div>

    )
}