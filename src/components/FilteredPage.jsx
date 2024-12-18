import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import MyLoader2 from "./UI/loader2/MyLoader2"
import PostService from '../API/PostService';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getItemsAction, selectItemAction, selectItemAction2, filteredPriceAction} from "../store/productReducer"
import classes from "./FilteredPage.module.css"
import basket from "../icons/basket.svg"
import scales from "../icons/scales.svg"
import cirrus2 from "../icons/cirrus2.jpg"
import heart from "../icons/heart.svg"
import cross from "../icons/cross.svg"

const SearchResults = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [isActiveCenter, setIsActiveCenter] = useState([])
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [allItems, setAllItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    function getItemById(item_id){
        navigate(`/item2/${item_id}`)
        console.log('success', item_id)
    }
  

    const filteredPrice = useSelector((state) => state.productReducer.filteredPrice);

    const addToFavorites = (item_id) => {
        const selected = items.find((item) => item.id === item_id)
        if(selected){
            dispatch(selectItemAction([selected]))
        }
    }

    const moveToFavoritesPage = () => {
        navigate('/favorites')
    }

    const addToKorzina = (item_id2) => {
        const selected2 = items.find((item) => item.id === item_id2)
        if(selected2){
            dispatch(selectItemAction2([selected2]))
        }
    }

    const getFilteredPrice = () => {
      const min = minPrice ? Number(minPrice) : 0;
      const max = maxPrice ? Number(maxPrice) : Infinity;
    
      const filtered = filteredItems2.filter(item => {
        const price = Number(item.price);
        return price >= min && price <= max;
      });
    
      setFilteredItems(filtered);
    };
  const filteredItems2 = useSelector((state) => state.productReducer.filteredItems2)
    console.log(filteredItems2)

    async function getItems() {
      const items = await PostService.getAll();
      setAllItems(items);
      setFilteredItems(filteredItems2);
      setIsLoading(false);
      return dispatch(getItemsAction(items));
    }
  
    const items = useSelector(state => state.productReducer.items);
    useEffect(()=>{
      getItems()
    }, [])
  return (
    <div>
    <div>
        <div className={classes.mainPageBtn0}>
            <button className={classes.mainPageBtn}>Акции</button>
            <button className={classes.mainPageBtn1}>🔥 TECHNO Распродажа</button>
            <button className={classes.mainPageBtn2}>TECHNO Рассрочка</button>
            <button className={classes.mainPageBtn3}>🔴 LIVE</button>
            <button className={classes.mainPageBtn4}>Ноутбуки</button>
            <button className={classes.mainPageBtn5}>Подарочные карты</button>
            <button className={classes.mainPageBtn6}><Link className={classes.mainPageBtn6P} to="/smartphones">Смартфоны</Link></button>
        </div>
    </div>
    <div>
        {isLoading ? (
            <div>
                <MyLoader2 />
            </div>
        ) : (
            <div className={classes.searchContainer}>
      <div className={classes.searchHeader}>
        
      </div>
      
      <div className={classes.contentWrapper}>
        <div className={classes.filtersSidebar}>
          <div className={classes.filterSection}>
            <h3 className={classes.filterTitle}>Цена (₸)</h3>
            <div className={classes.priceInputs}>
              <input type="text" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="От"/>
              <span>-</span>
              <input type="text" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="До" />
              <button className={classes.filteredBtn} onClick={() => getFilteredPrice()}>Применить</button>
            </div>
          </div>
          
          <div className={classes.filterSection}>
            <h3 className={classes.filterTitle}>Акции</h3>
            <div className={classes.filterOptions}>
              <div className={classes.filterOption}>Товары со скидкой</div>
              <div className={classes.filterOption}>Комплектом дешевле</div>
              <div className={classes.filterOption}>Товары с подарком</div>
            </div>
          </div>
        </div>

        <div className={classes.productsGrid}>
          <div className={classes.productCard}>
            <div className={classes.mainPageItemsP}>
            {filteredItems.slice(0,10).map((item, index) => {
            return(
              <div key={index} className={classes.mainPageItems}>
              <div className={classes.smartphonesPageMaterialParent}>
              <div className={classes.smartphonesPageMaterial}>
              <img src={basket} alt={basket} className={classes.mainPageBasketBtn} onClick={() => addToKorzina(item.id)}></img>
              </div>
              <div className={classes.mainPageMaterialIcon}>
              <img src={heart} alt={heart} className={classes.mainPageHeartBtn} onClick={() => addToFavorites(item.id)}></img>
              </div>
              </div>
              <img className={classes.mainPageImgItems} src={item.image} alt="image" />
              <p className={classes.mainPagePObogrevatel}>{item.title}</p>
              <p className={classes.mainPageP1Obogrevatel}>{item.price}₸</p>
              <div className={classes.mainPageBtnsParent}>
              <button className={classes.mainPageBtnObogrevatel} onClick={() => getItemById(item.id)}>Купить</button>
              <button className={classes.mainPageBtnObogrevatel} onClick={moveToFavoritesPage}>Избранные</button>
              </div>
          </div>
            )
        })}
            </div>
          </div>
        </div>
      </div>
    </div>
        )}
    </div>
    </div>
  );
}

export default SearchResults