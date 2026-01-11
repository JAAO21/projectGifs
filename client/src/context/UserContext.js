
import React, { useState,useEffect } from "react";
import Api from '../services/Api';
const Context = React.createContext({})

export const UserContextProvider = ({ children }) => {
    const [favorite, setFavorite] = useState([])
    const [jwt, setJwt] = useState(() => window.sessionStorage.getItem('jwt'));


    useEffect(() => {
        if (jwt) {
            Api({ type: 'get', path: 'api/favoriteGifs/allFavGif', token: jwt }).then((getFav) => {
                if (getFav.status) setFavorite(getFav.find)

            }).catch(error => {
                console.log(error)
            })
        }

    }, [jwt, setFavorite])

    return <Context.Provider value={
        {
            favorite,
            jwt,
            setJwt,
            setFavorite
        }
    }>
        {children}
    </Context.Provider>
}

export default Context;