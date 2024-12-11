import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import cirrus from "../icons/cirrus.jpg"
import classes from "./ComparePage.module.css"
import trash from "../icons/trash.svg"
import heart from "../icons/heart.svg"
import {compareItemAction, selectItemAction, selectItemAction2, removeItemAction2, removeItemAction3} from "../store/productReducer"

const ComparePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const compareItem = useSelector(state => state.productReducer.compareItem);
    const items = useSelector(state => state.productReducer.items);

    function getItemById(item_id){
        navigate(`/item2/${item_id}`)
        console.log('success', item_id)
    }

    const removeItem = (id) => {
        dispatch(removeItemAction3(id))
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
            {compareItem.length > 0 ? (
                <div>
            <div className={classes.comparePageD}>
                <p className={classes.comparePageDP}>Список сравнения</p>
            </div>
        <div className={classes.korzinaPageD2Parent}>
            <p className={classes.comparePagePP}>Товары</p>
            {compareItem.map((item) => (
                <div key={item.id} className={classes.korzinaPageDParents}>
                    <div className={classes.korzinaPageDParent}>
                        <img className={classes.korzinaPageImg} src={item.image} alt={item.image}></img>
                        <div className={classes.korzinaPageDHP}>
                            <div className={classes.comparePageHT}>
                            <h2 className={classes.korzinaPageH}>{item.title}</h2>
                            <img className={classes.comparePageT} src={trash} alt={trash} onClick={() => removeItem(item.id)}></img>
                            </div>
                            <p className={classes.korzinaPageP0}>{item.price}₸</p>
                            <div className={classes.KorzinaPageDT}>
                        <button className={classes.korzinaPageBtn} onClick={() => addToKorzina(item.id)}>В корзину</button>
                        <img className={classes.comparePageT} src={heart} alt={heart} onClick={() => addToFavorites(item.id)}></img>
                        </div>
                        </div>
                    </div>
                    <div className={classes.comparePage3D}>
                    <div className={classes.comparePage2}>Бонусы</div>
                    <div className={classes.comparePage2D}>-</div>
                    </div>
                </div>
            ))}
        </div>
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

export default ComparePage;