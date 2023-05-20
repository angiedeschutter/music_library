import { useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Gallery from './components/Gallery.jsx'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';
import { DataContext } from './contexts/DataContext';
import { SearchContent } from './contexts/SearchContext';


function App() {
  let [message, setMessage] = useState('Search for Music');
  let [data, setData] = useState([]);
  let searchInput = useRef('')

  const handleSearch = (e, search) => {
    e.preventDefault()
    const fetchData = async () => {
      try {
        document.title = `${search} Music`
        const response = await fetch(`https://itunes.apple.com/search?term=${search}`)
        const resData = await response.json()
        console.log(resData)
        if (resData.results.length) {
          setData(resData.results)
        } else {
          setMessage(`We could not find anything for ${search}`)
        }
      }
       catch (e) { }
  }
  if (search) {
    try { fetchData() }
    catch (e) { }

  }
}

return (
  <div className="App">
    {message}
    <Router>
      <Routes>
        <Route path='/' element={
          <>
            <SearchContent.Provider value={
              {
                term: searchInput,
                handleSearch
              }
            }>
              <SearchBar />
            </SearchContent.Provider>
            <DataContext.Provider value={data}>
              <Gallery />
            </DataContext.Provider>
          </>

        }
        />
        <Route path='/album/:id' element={<AlbumView />} />
        <Route path='/artist/:id' element={<ArtistView />} />
      </Routes>
    </Router>

  </div>
);
}

export default App;
