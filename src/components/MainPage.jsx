import React, {useState, useEffect} from 'react';
import classes from "./MainPage.module.css"
import technodom from "../icons/technodom.jpeg"
import {obogrevately} from "../data/obogrevately"
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getItemsAction} from "../store/productReducer"
import PostService from '../API/PostService';
import MyLoader from './UI/loader/MyLoader';
import {filteredProductAction, selectItemAction, selectItemAction2} from "../store/productReducer"
import technodom2 from "../icons/technodom2.jpg"
import technodom3 from "../icons/technodom3.png"
import technodom4 from "../icons/technodom4.png"
import chat from "../icons/chat.svg"
import ChatHistory from "./ChatHistory";
import { GoogleGenerativeAI } from "@google/generative-ai";
import MyLoader2 from "../components/UI/loader2/MyLoader2";
import send from "../icons/send.svg"

const MainPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [isVisible, setIsVisible] = useState(false)
    const [userInput, setUserInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const toggleVisible = () => {
        setIsVisible(!isVisible)
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

  const genAI = new GoogleGenerativeAI("AIzaSyDfExGHYv4q-QZ06-rZNUYboj2a2lKWV1M");
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `you are a highly specialized specialist consultant on technology and other electronic goods. 
you help users tell and choose the ideal equipment for them, providing detailed, structured, and professional advice. 
Your task includes:
1. Politely greet a user with one sentence and ask which language they would like to go with, kazakh or russian, then speak with them with a language they prefer.
2. Analyzing the user's preferences, price limit, and purpose of purchase.
3. Recommending suitable electronic device and giving them a device that is on the lists of havings.
4. Explaining why this device is suitable for the user.

Please respond professionally and visually format the output in Markdown for a better user experience.`,
  });

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;

      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setChatHistory([
        ...chatHistory,
        { type: "bot", message: "Sorry, something went wrong. Please try again later." },
      ]);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  const today = new Date()
  const day = today.getDay()+1
  const month = today.getMonth()+1
//   const getMonth = () => {
//     const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
//     if(month==1){
//         return
//     }
//   }

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
            <div className={classes.mainPageBtn0}>
            <button className={classes.mainPageBtn}>Акции</button>
            <button className={classes.mainPageBtn1}>🔥 TECHNO Распродажа</button>
            <button className={classes.mainPageBtn2}>TECHNO Рассрочка</button>
            <button className={classes.mainPageBtn3}>🔴 LIVE</button>
            <button className={classes.mainPageBtn4}>Ноутбуки</button>
            <button className={classes.mainPageBtn5}>Подарочные карты</button>
            <button className={classes.mainPageBtn6}><Link className={classes.mainPageBtn6P} to="/smartphones">Смартфоны</Link></button>
            </div>
            <img className={classes.mainPageJpg} src={technodom} alt={technodom} />
            <div className={classes.mainPageDChat1}>
            <div className={classes.mainPageDChat0x} onClick={() => setIsVisible(!isVisible)}>x</div>
            <div className={isVisible ? classes.mainPageDChat2 : classes.mainPageDChat} onClick={() => setIsVisible(!isVisible)}>
            <p className={isVisible ? classes.mainPageDChatP2 : classes.mainPageDChatP0}>Техно-бот</p>
            <p className={isVisible ? classes.mainPageDChatP3 : classes.mainPageDChatP}>Теперь еще удобнее!</p>
            </div>
            <div className={isVisible ? classes.mainPageModal : classes.mainPageModel0}>
            <div className={isVisible ? classes.mainPageChatModal : classes.mainPageChatModal0}>
            <div className={classes.mainPageChatHeader}>Начато {day} {month}</div>
            {isLoading ? (
            <MyLoader2 />
             ) : (
            <ChatHistory chatHistory={chatHistory} />
             )}
            <input className={classes.mainPageChatInput} type="text" placeholder="Введите сообщение" value={userInput} onChange={handleUserInput} onKeyDown={handleKeyPress}/>
            <img src={send} alt={send} className={classes.mainPageChatImg} onClick={sendMessage}></img>
            {/* <button className={classes.mainPageChatBtn} onClick={sendMessage}>Send</button>
            <button className={classes.mainPageChatBtn0} onClick={clearChat}>Clear</button> */}
            </div>
            </div>
            <button className={classes.mainPageBtnChat} onClick={() => setIsVisible(!isVisible)}>
            <img src={chat} alt={chat} className={classes.chatIcon} />
            </button>
            </div>
            <div className={classes.mainPageButtonsP}>
                <button className={classes.mainPageButtonsCh}>Популярные</button>
                <button className={classes.mainPageButtonsCh}>Обогреватели</button>
                <button className={classes.mainPageButtonsCh3}>Холодильники и морозильники</button>
                <button className={classes.mainPageButtonsCh4}>Стиральные машины</button>
                <button className={classes.mainPageButtonsCh}>Пылесосы</button>
                <button className={classes.mainPageButtonsCh5}>Компьютеры и ноутбуки</button>
            </div>
            <p className={classes.MainPageP}>Товары участвующие в акции:</p>
            {isLoading ? (
                // <p>Error occured</p>
                <MyLoader />
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
            <p className={classes.MainPageP}>Популярные товары:</p>
            <div className={classes.mainPageObogrevately}>
                {items.filter(item => item.type2 === "not").map((item, index) => (
                    <div key={index} className={classes.mainPageObogrevatel}>
                        <div className={classes.smartphonesPageMaterialParent}>
                                <div className={classes.smartphonesPageMaterial}>
                                <h2 className="material-icons" onClick={() => addToKorzina(item.id)}>download</h2>
                                </div>
                                <div className={classes.mainPageMaterialIcon}>
                                <h2 class="material-icons" onClick={() => addToFavorites(item.id)}>favorite</h2>
                                </div>
                                </div>
                        <img className={classes.mainPageImgObogrevatel} src={item.image} alt={item.image} />
                        <p className={classes.mainPagePObogrevatel}>{item.title}</p>
                        <p className={classes.mainPageP1Obogrevatel}>{item.price}₸</p>
                        <button className={classes.mainPageBtnObogrevatel} onClick={() => getItemById(item.id)}>Купить</button>
                    </div>
                ))}
            </div>
            <div className={classes.mainPageDivs}>
                <div className={classes.mainPageDivs0}><p>Распродажа</p></div>
                <div className={classes.mainPageDivs0}><p>Смартфоны и гаджеты</p></div>
                <div className={classes.mainPageDivs0}><p>Телевизоры</p></div>
                <div className={classes.mainPageDivs0}><p>Ноутбуки</p></div>
                <div className={classes.mainPageDivs0}><p>Наушники</p></div>
                <div className={classes.mainPageDivs0}><p>Планшеты</p></div>
                <div className={classes.mainPageDivs0}><p>Красота и здоровье</p></div>
                <div className={classes.mainPageDivs0}><p>Кондиционеры</p></div>
                <div className={classes.mainPageDivs0}><p>Холодильники</p></div>
                <div className={classes.mainPageDivs0}><p>Стиральные машины</p></div>
                <div className={classes.mainPageDivs0}><p>Пылесосы</p></div>
                <div className={classes.mainPageDivs0}><p>Встраиваемая техника</p></div>
                <div className={classes.mainPageDivs0}><p>Водонагреватели</p></div>
                <div className={classes.mainPageDivs0}><p>Спорт,туризм,багаж</p></div>
            </div>
            <div className={classes.mainPageImages}>
            <img className={classes.mainPageImages0} src={technodom2} alt={technodom2} />
            <img className={classes.mainPageImages0} src={technodom3} alt={technodom3} />
            <img className={classes.mainPageImages0} src={technodom4} alt={technodom4} />
            </div>
            <div className={classes.mainPageButtonsP}>
                <button className={classes.mainPageButtonsCh}>Бытовая техника</button>
                <button className={classes.mainPageButtonsCh2}>Встраиваемая техника</button>
                <button className={classes.mainPageButtonsCh3}>Климатическая техника</button>
                <button className={classes.mainPageButtonsCh4}>Хранение продуктов</button>
                <button className={classes.mainPageButtonsCh}>Уход за одеждой</button>
                <button className={classes.mainPageButtonsCh5}>Уборка и мойка</button>
            </div>
            <div className={classes.mainPageObogrevately}>
                {items.filter(item => item.type === "notebook").map((item, index) => (
                    <div key={index} className={classes.mainPageObogrevatel}>
                        <div className={classes.smartphonesPageMaterialParent}>
                                <div className={classes.smartphonesPageMaterial}>
                                <h2 className="material-icons" onClick={() => addToKorzina(item.id)}>download</h2>
                                </div>
                                <div className={classes.mainPageMaterialIcon}>
                                <h2 class="material-icons" onClick={() => addToFavorites(item.id)}>favorite</h2>
                                </div>
                                </div>
                        <img className={classes.mainPageImgObogrevatel} src={item.image} alt={item.image} />
                        <p className={classes.mainPagePObogrevatel}>{item.title}</p>
                        <p className={classes.mainPageP1Obogrevatel}>{item.price}₸</p>
                        <button className={classes.mainPageBtnObogrevatel} onClick={() => getItemById(item.id)}>Купить</button>
                    </div>
                ))}
            </div>
            <p className={classes.MainPageP}>Лучшие предложения:</p>
            <div className={classes.mainPageObogrevately}>
                {items.filter(item => item.type === "notebook").map((item, index) => (
                    <div key={index} className={classes.mainPageObogrevatel}>
                        <div className={classes.smartphonesPageMaterialParent}>
                                <div className={classes.smartphonesPageMaterial}>
                                <h2 className="material-icons" onClick={() => addToKorzina(item.id)}>download</h2>
                                </div>
                                <div className={classes.mainPageMaterialIcon}>
                                <h2 class="material-icons" onClick={() => addToFavorites(item.id)}>favorite</h2>
                                </div>
                                </div>
                        <img className={classes.mainPageImgObogrevatel} src={item.image} alt={item.image} />
                        <p className={classes.mainPagePObogrevatel}>{item.title}</p>
                        <p className={classes.mainPageP1Obogrevatel}>{item.price}₸</p>
                        <button className={classes.mainPageBtnObogrevatel} onClick={() => getItemById(item.id)}>Купить</button>
                    </div>
                ))}
            </div>
            <p className={classes.MainPageP}>Цифровой товар:</p>
            <div className={classes.mainPageObogrevately}>
                {items.filter(item => item.type === "notebook").map((item, index) => (
                    <div key={index} className={classes.mainPageObogrevatel}>
                        <div className={classes.smartphonesPageMaterialParent}>
                                <div className={classes.smartphonesPageMaterial}>
                                <h2 className="material-icons" onClick={() => addToKorzina(item.id)}>download</h2>
                                </div>
                                <div className={classes.mainPageMaterialIcon}>
                                <h2 class="material-icons" onClick={() => addToFavorites(item.id)}>favorite</h2>
                                </div>
                                </div>
                        <img className={classes.mainPageImgObogrevatel} src={item.image} alt={item.image} />
                        <p className={classes.mainPagePObogrevatel}>{item.title}</p>
                        <p className={classes.mainPageP1Obogrevatel}>{item.price}₸</p>
                        <button className={classes.mainPageBtnObogrevatel} onClick={() => getItemById(item.id)}>Купить</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;