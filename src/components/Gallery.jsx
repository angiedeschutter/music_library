import { useState } from 'react'
import GalleryItem from './GalleryItem'
import { useContext } from 'react'
import { DataContext } from '../contexts/DataContext'

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