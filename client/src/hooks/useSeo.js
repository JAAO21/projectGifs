import { useEffect, useRef } from "react";
const useSeo = ({ title, description }) => {
    const prevTitle = useRef(document.title) //guarda el titulo anterior
    const prevDescription = useRef(document.querySelector('meta[name="description"]').getAttribute('content')) //guarda la descripción  anterior
    useEffect(() => {
        const previusTitle = prevTitle.current;
        if (title) {
            document.title = `${title} | Gipfhy`;//cambia el titulo de la pagina
        }
        return () => document.title = previusTitle;
    }, [title])

    useEffect(() => {
        const previusDescription = prevDescription.current;
        let metaDescription = document.querySelector('meta[name="description"]');
        if (description) {
            metaDescription.setAttribute('content',description) 
        }
        return () =>  metaDescription.setAttribute('content',previusDescription)
    }, [description])

}

export default useSeo;