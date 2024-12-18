import './App.css';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import React, {useEffect, useState} from "react";
import MainPage from "./components/MainPage";
import KorzinaPage from "./components/KorzinaPage";
import KatalogPage from "./components/KatalogPage";
import FavoritesPage from "./components/FavoritesPage";
import ComparePage from './components/ComparePage';
import Smartphones from "./components/Smartphones"
import ItemOneScreen from './components/ItemOneScreen';
import ItemOneScreenInfo from './components/ItemOneScreenInfo';
import ChatPage from './components/ChatPage';
import {AuthContext} from "./components/AuthContext"
import RegistrationPage from './components/RegistrationPage';
import FilteredPage from "./components/FilteredPage"
import Laptops from './components/Laptops';

function App() {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(()=>{
    if (localStorage.getItem('auth')){
      setIsAuth(true)
    }
  }, [])
  return (
    <div>
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <BrowserRouter>
          {isAuth ? (
            <>
              <Header />
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/korzina" element={<KorzinaPage />} />
                <Route path="/katalog" element={<KatalogPage />} />
                <Route path="/favorites/:item2_id" element={<FavoritesPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/smartphones" element={<Smartphones />} />
                <Route path="/item/:id" element={<ItemOneScreen />} />
                <Route path="/item2/:item_id" element={<ItemOneScreenInfo />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/compare/:item3_id" element={<ComparePage />} />
                <Route path="/filtered" element={<FilteredPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/laptops" element={<Laptops />} />
              </Routes>
            </>
          ) : (
            <Routes>
              <Route path="/register" element={<RegistrationPage />} />
            </Routes>
          )}
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;