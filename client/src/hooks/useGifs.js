import { useContext, useEffect, useState } from 'react';
import getGifs from 'services/getGifs.js';
import GifsContext from 'context/GifsContext.js'


const InitialPage = 0;

const UseGifs = ({ keyword,rating } = { keyword: null }) => {
    const [loading, setLoading] = useState(false);
    const [loadingNextPage, setloadingNextPage] = useState(false);
    const [page, setPage] = useState(InitialPage);
    const { gifs, setGifs } = useContext(GifsContext);

    //get keyword local storage
    const keywordToUse = keyword || localStorage.getItem('lastKeyword') || 'random'

    useEffect(() => {
        setLoading(true)
        getGifs({ keyword: keywordToUse, rating }).then(g => {
            setGifs(g)
            setLoading(false)
            //save keyword local storage
            localStorage.setItem('lastKeyword', keyword)
        })
    }, [keyword, setGifs, keywordToUse,rating])

    useEffect(() => {
        if (page === InitialPage) return

        setloadingNextPage(true)

        getGifs({ keyword: keywordToUse,rating ,page }).then(nexGifs => {

            setGifs(prevGifs => prevGifs.concat(nexGifs))
            setloadingNextPage(false)
        })
    }, [page, keywordToUse, setGifs,rating])
    return { gifs, loading, setPage, loadingNextPage }
}

export default UseGifs;