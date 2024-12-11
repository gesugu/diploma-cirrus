import React, { useState } from 'react';
import classes from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { searchProductAction } from '../store/productReducer';
import { Link } from 'react-router-dom';
import MyLoader2 from "../components/UI/loader2/MyLoader2"

const Header = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.productReducer.items);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

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
          <h2 className={classes.h2Header}><Link className={classes.h2Header} to='/'>Все делаем с любовью</Link></h2>
          <button className={classes.btnHeader}>
            <Link className={classes.btnPHeader} to="/katalog">
              Каталог
            </Link>
          </button>
          <input
            className={classes.inputHeader}
            onClick={() => setIsVisible(!isVisible)}
            onChange={(e) => searchItems(e.target.value)}
            value={input}
            placeholder="Я хочу найти"
          />
          <div className={classes.h2Parent}>
            <h2 className="material-icons">favorite</h2>
            <h2>
              <Link className={classes.h2Icons} to="/favorites">
                Избранное
              </Link>
            </h2>
          </div>
          <div className={classes.h2Parent2}>
            <h2 className="material-icons">scale</h2>
            <h2>
              <Link className={classes.h2Icons} to="/compare">
                Сравнить
              </Link>
            </h2>
          </div>
          <div className={classes.h2Parent3}>
            <h2 className="material-icons">download</h2>
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
              filteredItems.map((item, index) => (
                <div key={index}>
                  <p><Link className={classes.headerPageLinkP} to={`/item2/${item.id}`}>{item.title}</Link></p>
                </div>
              ))
            ) : (
              <p>Товары не найдены</p>
            )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;