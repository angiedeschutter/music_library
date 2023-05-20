import { useContext } from 'react'
import { SearchContent } from '../contexts/SearchContext'

export default function SearchBar() {

    const{term, handleSearch} =useContext(SearchContent)

    return(
    <form >
        <input 
            ref={term}
            type='text'
            placeholder='Enter a search term here'
            onChange={e => handleSearch(e, term.current.value)}
        />
        <input type='submit'/>
    </form>
    )
}