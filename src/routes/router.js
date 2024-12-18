import MainPage from "../components/MainPage";
import KorzinaPage from "../components/KorzinaPage";
import KatalogPage from "../components/KatalogPage";
import FavoritesPage from "../components/FavoritesPage";
import ComparePage from "../components/ComparePage";
import Smartphones from "../components/Smartphones"
import ItemOneScreen from "../components/ItemOneScreen";
import ItemOneScreenInfo from "../components/ItemOneScreenInfo";
import ChatPage from "../components/ChatPage";
import RegistrationPage from "../components/RegistrationPage";
import FilteredPage from "../components/FilteredPage"
import Laptops from "../components/Laptops"

export const routes = [
    {path: '/', element: <MainPage/>},
    {path: '/korzina', element: <KorzinaPage/>},
    {path: '/katalog', element: <KatalogPage/>},
    {path: '/favorites/:item2_id', element: <FavoritesPage/>},
    {path: '/compare', element: <ComparePage/>},
    {path: '/smartphones', element: <Smartphones/>},
    {path: '/item/:id', element: <ItemOneScreen/>},
    {path: '/item2/:item_id', element: <ItemOneScreenInfo/>},
    {path: '/favorites', element: <FavoritesPage/>},
    {path: '/chat', element: <ChatPage/>},
    {path: '/compare/:item3_id', element: <ComparePage/>},
    {path: '/register', element: <RegistrationPage/>},
    {path: '/filtered', element: <FilteredPage/>},
    {path: '/laptops', element: <Laptops/>},
]