import { useContext } from "react";
import GifsContext from 'context/GifsContext';
 const GlobalGifs = () =>{
    const {gifs}= useContext(GifsContext);
    return gifs
 }


 export default GlobalGifs;