import React, {useState, useEffect} from "react"
import classes from "./Smartphones.module.css"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MyLoader2 from '../components/UI/loader2/MyLoader2';
import {getItemsAction, selectItemAction, selectItemAction2} from "../store/productReducer"
import PostService from '../API/PostService';
import send from "../icons/send.svg"
import basket from "../icons/basket.svg"
import scales from "../icons/scales.svg"
import cirrus2 from "../icons/cirrus2.jpg"
import heart from "../icons/heart.svg"
import cross from "../icons/cross.svg"

const Smartphones = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    function getItemById(item_id){
        navigate(`/item2/${item_id}`)
        console.log('success', item_id)
    }

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

    const moveToKorzinaPage = () => {
        navigate('/korzina')
    }

    async function getItems() {
        const items = await PostService.getAll()
        
        setIsLoading(false)
        return dispatch(getItemsAction(items));
    }

    const items = useSelector(state => state.productReducer.items);
    useEffect(()=>{
      getItems()
    }, [])
    return(
        <div className={classes.smartphonesPage}>
            {isLoading ? (
                <MyLoader2 />
            ) : (
                <div>
                    <div className={classes.mainPageBtn0}>
            <button className={classes.mainPageBtn}>Акции</button>
            <button className={classes.mainPageBtn1}>🔥 TECHNO Распродажа</button>
            <button className={classes.mainPageBtn2}>TECHNO Рассрочка</button>
            <button className={classes.mainPageBtn3}>🔴 LIVE</button>
            <button className={classes.mainPageBtn4}><Link className={classes.mainPageBtn6P} to="/laptops">Ноутбуки</Link></button>
            <button className={classes.mainPageBtn5}>Подарочные карты</button>
            <button className={classes.mainPageBtn6}><Link className={classes.mainPageBtn6P} to="/smartphones">Смартфоны</Link></button>
            </div>
                <div className={classes.mainPageItemsP}>
                    {items.filter(item => item.type === 'smartphone').map((item, index) => {
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
            )}
        </div>
    )
}

export default Smartphones