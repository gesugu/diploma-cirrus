import React, {useState, useEffect} from 'react';
import MyLoader2 from "./UI/loader2/MyLoader2"
import PostService from '../API/PostService';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
// import classes from "./MainPage.module.css"
import classes from "./KatalogPage.module.css"
import {filteredProductAction, selectItemAction, selectItemAction2, getItemsAction} from "../store/productReducer"

const KatalogPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [isActiveCenter, setIsActiveCenter] = useState([])

    const handleMouseEnter = (type) => {
        const filteredItems = items.filter(item => item.typeSpecial === type)
        setIsActiveCenter(filteredItems)
    }

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

  const moveToSmartPhonesPage = () => {
    navigate('/smartphones')
  }

  const selectedItem = (item2_id) => {
      dispatch(selectItemAction([item2_id]))
      navigate(`/favorites/${item2_id}`)
  }

  const addToKorzina = (item_id2) => {
      const selected2 = items.find((item) => item.id === item_id2)
      if(selected2){
          dispatch(selectItemAction2([selected2]))
      }
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
    return (
    <div>
        {isLoading ? (
            <div>
                <MyLoader2 />
            </div>
        ) : (
            <div className={classes.catalogContainer}>
      <div className={classes.catalogLeft}>
        {items.filter(item => item.typeSpecial2).slice(0,3).map((item, index) => {
            return(
                <div key={index} onMouseEnter={() => handleMouseEnter(item.typeSpecial)} className={classes.categoryItem}>{item.typeSpecial2}</div>
            )
        })}
      </div>
      
      <div className={classes.catalogCenter}>
        <div className={classes.categorySection}>
            {isActiveCenter.slice(0,1).map((item, index) => {
                return(
                    <h3>{item.typeSpecial}</h3>
                )
            })}
          <div className={classes.subcategoryList}>
            {isActiveCenter.length > 0 ? (
                isActiveCenter.slice(0,9).map((item, index) => {
                    return(
                        <div key={index} onClick={() => moveToSmartPhonesPage()} className={classes.subcategoryItem}>{item.type}</div>
                    )
                })
            ) : (
                <p>error occured</p>
            )}
          </div>
        </div>
        
        <div className={classes.categorySection}>
            {isActiveCenter.slice(0,1).map((item, index) => {
                return(
                    <h3>{item.typeSpecial}</h3>
                )
            })}
          <div className={classes.subcategoryList}>
            {isActiveCenter.length > 0 ? (
                isActiveCenter.slice(0,9).map((item, index) => {
                    return(
                        <div key={index} className={classes.subcategoryItem}>{item.type}</div>
                    )
                })
            ) : (
                <p>error occured</p>
            )}
          </div>
        </div>
      </div>
      
      <div className={classes.catalogRight}>
      <div className={classes.categorySection}>
            {isActiveCenter.slice(0,1).map((item, index) => {
                return(
                    <h3>{item.typeSpecial}</h3>
                )
            })}
          <div className={classes.subcategoryList}>
            {isActiveCenter.length > 0 ? (
                isActiveCenter.slice(0,9).map((item, index) => {
                    return(
                        <div key={index} className={classes.subcategoryItem}>{item.type}</div>
                    )
                })
            ) : (
                <p>error occured</p>
            )}
          </div>
        </div>
        
        <div className={classes.categorySection}>
            {isActiveCenter.slice(0,1).map((item, index) => {
                return(
                    <h3>{item.typeSpecial}</h3>
                )
            })}
          <div className={classes.subcategoryList}>
            {isActiveCenter.length > 0 ? (
                isActiveCenter.slice(0,9).map((item, index) => {
                    return(
                        <div key={index} className={classes.subcategoryItem}>{item.type}</div>
                    )
                })
            ) : (
                <p>error occured</p>
            )}
          </div>
        </div>
      </div>
            </div>
        )}
    </div>
    );
}

export default KatalogPage;