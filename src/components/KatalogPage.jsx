import React, {useState, useEffect} from 'react';
import MyLoader2 from "./UI/loader2/MyLoader2"
import PostService from '../API/PostService';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import classes from "./MainPage.module.css"
import {filteredProductAction, selectItemAction, selectItemAction2, getItemsAction} from "../store/productReducer"

const KatalogPage = () => {
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
                // <p>Error occured</p>
                <MyLoader2 />
            ) : (
                <div className={classes.mainPageItemsP}>
                    {
                        items.filter(item => item.popular === "yes").map((item, index) => {
                            return(
                                <div key={index} className={classes.mainPageItems}>
                                <div className={classes.smartphonesPageMaterialParent}>
                                <div className={classes.smartphonesPageMaterial}>
                                <h2 className="material-icons" onClick={() => addToKorzina(item.id)}>download</h2>
                                </div>
                                <div className={classes.mainPageMaterialIcon}>
                                <h2 class="material-icons" onClick={() => addToFavorites(item.id)}>favorite</h2>
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
                        }
                        )
                    }
                </div>
            )}
      </div>
    );
}

export default KatalogPage;