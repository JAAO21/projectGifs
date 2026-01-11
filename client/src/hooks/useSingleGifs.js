import { useState, useEffect } from "react";
import UseGifs from "./useGifs";
import getSingleGifs from "services/getSingleGifs";
const useSingleGifs = ({ id }) => {
    const { gifs } = UseGifs();
    const gifsCache = gifs.find(singleGif => singleGif.id === id)
    const [gif, setGifs] = useState(gifsCache)
    const [isLoading,setIsLoading]=useState(false);
    const [isError,setIsError]=useState(false);

    useEffect(() => {
        if (!gif) {
            setIsLoading(true)

            getSingleGifs({ id }).then(g => {
                setGifs(g)
                setIsLoading(false)
                setIsError(false)
            }).catch(error =>{
                setIsLoading(false)
                setIsError(true)
                /* console.log(error) */})
        }
    }, [gif, id])
    return { gif,isLoading,isError };
}

export default useSingleGifs;