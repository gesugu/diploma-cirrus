import React from "react";
import { Link, useParams } from 'react-router-dom';
import classes from "./ItemOneScreen.module.css"
import {smartphonesArr} from "../data/smartphonesArr"
import { useSelector } from 'react-redux';
import { setProductInfoAction, infoProduct } from "../store/productReducer";

const ItemOneScreen = () => {
    const {id} = useParams()
    const smartphonesArr2 = useSelector(state => state.productReducer.smartphonesArr);
    const infoProduct = smartphonesArr2.find(item => String(item.id) === id);
    console.log(infoProduct);
    return(
        <div className={classes.ItemOneScreen}>
            <img src={infoProduct.image}></img>
            <p>{infoProduct.title}</p>
            <p>{infoProduct.price}</p>
        </div>
    )
}

export default ItemOneScreen;