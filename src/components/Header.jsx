import React, { useState } from 'react';
import classes from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { searchProductAction } from '../store/productReducer';
import { Link, useNavigate } from 'react-router-dom';
import MyLoader2 from "../components/UI/loader2/MyLoader2"
import basket from "../icons/basket.svg"
import scales from "../icons/scales.svg"
import cirrus2 from "../icons/cirrus2.jpg"
import heart from "../icons/heart.svg"
import cross from "../icons/cross.svg"
import {filteredProductAction, filteredItemsAction2} from "../store/productReducer"
import search from "../icons/search.svg"

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const items = useSelector((state) => state.productReducer.items);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isClicked, setIsClicked] = useState(false)

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  const goFilter = (type) => { 
    console.log('фильтр', type);
    dispatch(filteredItemsAction2(type)); 
    navigate('/filtered') 
  }

  const toggleClick = () => {
    setIsClicked(true)
  }

  const goMain = () => {
    navigate('/')
  }

  const searchItems = (input) => {
    setInput(input);
    setIsLoading(true);
    
  const result = items.filter((item) =>
    item.title.toLowerCase().includes(input.toLowerCase())
    )
    setFilteredItems(result);
    setIsLoading(false);
  };

  return (
    <div className={classes.headerPageParent}>
      <div className={classes.headerPage}>
        <div className={classes.headerPage3}>
          <button className={classes.headerPage3Btn}>Скачать приложение</button>
          <p className={classes.headerPage3P}>1717 с 9:00 до 22:00 ежедневно</p>
          <button className={classes.btnHeader3}>Рус</button>
          <button className={classes.btnHeader3}>Eng</button>
        </div>
        <div className={classes.headerPage2}>
        <div className={classes.h2Parent3Img}>
          <img className={classes.headerPage2Img} onClick={() => goMain()} src={cirrus2} alt={cirrus2}></img>
          </div>
          {/* <button className={classes.btnHeader}>
            <Link className={classes.btnPHeader} to="/katalog">
              Каталог
            </Link>
          </button> */}
          <button className={isClicked ? classes.btnHeaderClicked : classes.btnHeader} onClick={toggleClick}>
            <Link className={classes.btnPHeader} to="/katalog">
              Каталог
            </Link>
            {isClicked ? <img className={classes.headerBtnImg} src={cross} alt={cross} /> : <img className={classes.headerBtnImg2} src={search} alt={search}></img>}
          </button>
          <input
            className={classes.inputHeader}
            onClick={() => setIsVisible(!isVisible)}
            onChange={(e) => searchItems(e.target.value)}
            value={input}
            placeholder="Я хочу найти"
          />
          <div className={classes.h2Parent}>
          <img className={classes.h2HeaderImg} src={heart} alt={heart}></img>
            <h2>
              <Link className={classes.h2Icons} to="/favorites">
                Избранное
              </Link>
            </h2>
          </div>
          <div className={classes.h2Parent2}>
          <img className={classes.h2HeaderImg} src={scales} alt={scales}></img>
            <h2>
              <Link className={classes.h2Icons} to="/compare">
                Сравнить
              </Link>
            </h2>
          </div>
          <div className={classes.h2Parent3}>
            <img className={classes.h2HeaderImg} src={basket} alt={basket}></img>
            <h2>
              <Link className={classes.h2Icons} to="/korzina">
                Корзина
              </Link>
            </h2>
          </div>
        </div>
      </div>
      <div
        onChange={() => toggleVisible()}
        className={isVisible ? classes.visibleModal : classes.notVisibleModal}>
        <div className={classes.modalContent}>
          <p className={classes.modalContentP}>Возможно вы ищете:</p>
          {isLoading ? (
            <MyLoader2 />
          ) : (
            <div>
              {filteredItems.length > 0 ? (
              filteredItems.slice(0,3).map((item, index) => (
                <div key={index}>
                  <p><Link className={classes.headerPageLinkP} to={`/item2/${item.id}`}>{item.title}</Link></p>
                </div>
              ))
            ) : (
              <div> 
          {items.filter(item => item.type).slice(0,3).map((item, index) => { 
            return( 
                <div key={index} onClick={() => goFilter(item.type)} className={classes.categoryItem}>{item.type}</div> 
            ) 
        })} 
        </div>
            )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;