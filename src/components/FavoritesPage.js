import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import classes from "./KorzinaPage.module.css"
import cirrus from "../icons/cirrus.jpg"
import {compareItemAction, selectItemAction, selectItemAction2, removeItemAction2} from "../store/productReducer"

const FavoritesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const selectItem = useSelector(state => state.productReducer.selectItem);
    const items = useSelector(state => state.productReducer.items);

    function getItemById(item_id){
        navigate(`/item2/${item_id}`)
        console.log('success', item_id)
    }

    const goToOneScreen = (item_id) => {
        navigate(`/item2/${item_id}`)
    }

    const removeItem = (id) => {
        dispatch(removeItemAction2(id))
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
    return (
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
        <div>
            {selectItem.length > 0 ? (
        <div className={classes.korzinaPageD2Parent}>
            {selectItem.map((item) => (
                <div key={item.id} className={classes.korzinaPageDParents}>
                    <div className={classes.korzinaPageDParent}>
                        <img className={classes.korzinaPageImg} onClick={() => goToOneScreen(item.id)} src={item.image} alt={item.image}></img>
                        <div className={classes.korzinaPageDHP}>
                            <h2 className={classes.korzinaPageH} onClick={() => goToOneScreen(item.id)}>{item.title}</h2>
                            <p className={classes.korzinaPageP0} onClick={() => goToOneScreen(item.id)}>{item.price}₸</p>
                        </div>
                        <button className={classes.korzinaPageBtn} onClick={() => removeItem(item.id)}>Удалить</button>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <div className={classes.korzinaPageDi}>
            <div className={classes.korzinaPageD}>
                <img className={classes.korzinaPageDImg} src={cirrus} alt={cirrus}></img>
                <p className={classes.korzinaPageDP}>Избранные пусто</p>
                <button className={classes.korzinaPageDBtn}><Link className={classes.korzinaPageDP0} to="/">На главную</Link></button>
            </div>
            <p className={classes.korzinaPageDiP}>Рекомендуем</p>
            <div className={classes.KorzinaPageDd}>
                {items.filter(item => item.type === 'smartphone').map((item, index) => (
                    <div key={index} className={classes.mainPageItems}>
                        <div className={classes.smartphonesPageMaterialParent}>
                            <div className={classes.smartphonesPageMaterial}>
                                <h2 className="material-icons" onClick={() => addToKorzina(item.id)}>download</h2>
                            </div>
                            <div className={classes.mainPageMaterialIcon}>
                                <h2 className="material-icons" onClick={() => addToFavorites(item.id)}>favorite</h2>
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
                ))}
            </div>
        </div>
    )}
        </div>
        </div>
    );
}

export default FavoritesPage;