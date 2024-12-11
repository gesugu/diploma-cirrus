import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import classes from "./ItemOneScreen.module.css"
import {useDispatch, useSelector} from "react-redux";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import PostService2 from "../API/PostService2"
import {addUserAction, removeUserAction, getUserAction, selectItemAction2, compareItemAction} from "../store/productReducer"
import MyLoader2 from "../components/UI/loader2/MyLoader2"

const ItemOneScreenInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const usersStore = useSelector(state =>state.productReducer.users)
    const {item_id} = useParams()
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const swiper = useSwiper()
    const itemsStore = useSelector(state => state.productReducer.items);

    const currentItem = itemsStore.find(item => String(item.id) === String(item_id));
    const [selectedImg, setSelectedImg] = useState(currentItem.image)

    const addUser = (first_name, last_name,  email) => {
      const user = {
          id: Date.now(),
          email: email,
          first_name: first_name,
          last_name: last_name,
          avatar: 'https://i.pinimg.com/736x/3e/a7/43/3ea7433e7ff51dc0e14c7a4b097665cc.jpg'
      }
      if(first_name && last_name && email){
        const strEmail = String(email)
          if(!strEmail.includes('@')){
              alert('type a valid email')
              return
          }
          else{
              dispatch(addUserAction(user))
          }
      }
  }

  const addToKorzina = (item_id) => {
    const selected = itemsStore.find((item) => item.id === item_id)
        if(selected){
            dispatch(selectItemAction2([selected]))
            navigate('/korzina')
        }
  }

  function removeUser(user_id){
    if(user_id){
        return dispatch(removeUserAction(user_id))
    }
}

    const priceKredit = Math.round(currentItem.price / 60)
    const rassrochka = Math.round(currentItem.price / 24)
    // const date = Date.date(Number(getDay()))
    const clickImg = (img) => {
        setSelectedImg(img)
    }

    const moveToComparePage = (item_id3) => {
      const selected3 = itemsStore.find((item) => item.id === item_id3)
      if(selected3){
          dispatch(compareItemAction([selected3]))
      }
  }

    async function getUser() {
      const response = await PostService2.getAll()
      console.log(response);
      const users = response.data
      console.log(users);
      dispatch(getUserAction(users))
      setIsLoading(false)
  }
  useEffect(()=>{
    getUser();
  }, [])
    return(
        <div className={classes.itemInfoPage}>
            <div className={classes.mainPageBtn0}>
            <button className={classes.mainPageBtn}>Акции</button>
            <button className={classes.mainPageBtn1}>🔥 TECHNO Распродажа</button>
            <button className={classes.mainPageBtn2}>TECHNO Рассрочка</button>
            <button className={classes.mainPageBtn3}>🔴 LIVE</button>
            <button className={classes.mainPageBtn4}>Ноутбуки</button>
            <button className={classes.mainPageBtn5}>Подарочные карты</button>
            <button className={classes.mainPageBtn6}><Link className={classes.mainPageBtn6P} to="/smartphones">Смартфоны</Link></button>
            </div>
            <div className={classes.itemInfoPageDP1}>
            <div className={classes.itemInfoPage1}>
            <div className={classes.itemInfoPage0}>
                <p className={classes.itemInfoPageP}>{currentItem.title}</p>
                <div className={classes.itemInfoPageSwiperPImg}>
                <Swiper className={classes.itemInfoPageSwiperP}
            spaceBetween={10}
            slidesPerView={4}
          >
            {[currentItem.image, currentItem.image2, currentItem.image3, currentItem.image4].map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className={classes.itemInfoPageSwiperImg}
                  onClick={() => clickImg(img)}
                />
              </SwiperSlide>
            ))}
                </Swiper>
                <img className={classes.itemInfoPageImg} src={selectedImg} alt={currentItem.image}/>
                </div>
            </div>
            <div className={classes.itemInfoPage0}>
                <p className={classes.itemInfoPageP}>Цвет: {currentItem.description}</p>
                <p className={classes.itemInfoPage0P2}>Характеристики</p>
                <p className={classes.itemInfoPage0P3}>{currentItem.description2}</p>
                <p className={classes.itemInfoPage0P3}>Тип: {currentItem.type}</p>
                <p className={classes.itemInfoPage0P3}>Год: {currentItem.year}</p>
            </div>
            </div>
            <div className={classes.itemInfoPageD1}>
              <p className={classes.itemInfoPageD1P}>Артикул: 284639</p>
              <p className={classes.itemInfoPageD1P}>Гарантия низкой цены</p>
              <hr />
              <p className={classes.itemInfoPageD1Price}>{currentItem.price}₸</p>
              <p className={classes.itemInfoPageD1P}>В кредит {priceKredit}₸ x 60 мес.</p>
              <p className={classes.itemInfoPageD1P}>В рассрочку {rassrochka}₸ x 24 мес.</p>
              <button className={classes.itemInfoPageD1Btn} onClick={() => addToKorzina(currentItem.id)}>Добавить в корзину</button>
              <button className={classes.itemInfoPageD1Btn} onClick={() => moveToComparePage(currentItem.id)}>Сравнить</button>
              <p className={classes.itemInfoPageD1P}>Экспресс:за 60 минут</p>
              <p className={classes.itemInfoPageD1P}>Самовывоз:</p>
            </div>
            </div>
            <div className={classes.itemInfoPageDi0}>
              <div className={classes.itemInfoPageDi1}>
                <p className={classes.itemInfoPageDi1P}>🪙 Нашли товар дешевле?
                Компенсируем 110% разницы</p>
              </div>
              <div className={classes.itemInfoPageDi1}>
                <p className={classes.itemInfoPageDi1P}>🔁 Условия доставки и самовывоза</p>
              </div>
              <div className={classes.itemInfoPageDi1}>
                <p className={classes.itemInfoPageDi1P}>✈︎ Условия возврата и обмена</p>
              </div>
            </div>
            <div className={classes.itemInfoPageCh}>
              <p className={classes.itemInfoPagePG}>Характеристики</p>
              <p className={classes.itemInfoPagePG0}>{currentItem.description2}</p>
            </div>
            <div className={classes.itemInfoPageR}>
              <p className={classes.itemInfoPagePG}>Рейтинг и отзывы</p>
              <p className={classes.itemInfoPageRP}>⭐⭐⭐⭐⭐ {usersStore.length} отзывов</p>
              <hr className={classes.itemInfoPageRHr} />
              <p className={classes.itemInfoPageRP0}>Фото и видео покупателей</p>
              {isLoading ? (
              <MyLoader2 />
            ) : (
              <div>
                {usersStore.length > 0 ? (
                  usersStore.map((user, index) => (
                    <div key={index}>
                      <p className={classes.itemInfoPageRP1}>⭐⭐⭐⭐⭐</p>
                      <img src={user.image} alt={user.image} />
                      <p className={classes.itemInfoPageRP2}>{user.first_name} {user.last_name}</p>
                      <p className={classes.itemInfoPageRP2}>{user.email}</p>
                      {/* <button onClick={() => removeUser(user.id)}>Удалить</button> */}
                      <hr className={classes.itemInfoPageRHr} />
                    </div>
                  ))
                ) : (
                  <p>Отзывов нет</p>
                )}
                <input type="text" onChange={(first_name) => setFirstName(first_name)} placeholder="Введите имя"></input>
                <input type="text" onChange={(last_name) => setLastName(last_name)} placeholder="Введите второе имя"></input>
                <input type="text" onChange={(email) => setEmail(email)} placeholder="Введите email"></input>
                <button onClick={() => addUser(first_name, last_name, email)}>Оставить отзыв</button>
              </div>
            )}
            </div>
        </div>
    )
}

export default ItemOneScreenInfo;