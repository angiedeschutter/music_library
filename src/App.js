import React from 'react'
import { useState, useRef, useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';
import { DataContext } from './contexts/DataContext';
import { SearchContent } from './contexts/SearchContext';
import { createResource as fetchData } from './components/helper';
import Spinner from './components/Spinner';
const Gallery = React.lazy(() => import('./components/Gallery.jsx'))



function App() {
  let [message, setMessage] = useState('Search for Music');
  let [data, setData] = useState([]);
  let searchInput = useRef('')
  let [searchTerm, setSearchTerm] = useState('')

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

  useEffect(() => {
    if (searchTerm) {
      setData(fetchData(searchTerm))
    }
  }, [searchTerm])

 
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
                <Suspense fallback={<Spinner />}>
                  <Gallery  />
                </Suspense>
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
