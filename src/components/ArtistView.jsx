import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function ArtistView() {
    const { id } = useParams()
    const [artistData, setArtistData] = useState([])

    return(
    <div>
        <h2> the is passed is {id}</h2>
        <p>Artist data goes here</p>
    </div>
    )
}