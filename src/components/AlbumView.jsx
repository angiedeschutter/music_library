import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AlbumView() {
    const { id } = useParams()
    const [albumData, setAlbumData] = useState([])

    return(
    <div>
        <h2> the is passed is {id}</h2>
        <p> album date goes here</p>
    </div>
    )
}