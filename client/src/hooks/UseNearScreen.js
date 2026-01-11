
import { useState, useRef, useEffect } from 'react';


const UseNearScreen = ({ externalRef, one = true } = {}) => {
    const [show, setShow] = useState(false);
    const elementRef = useRef();
    useEffect(() => {
        let observer;
        const elementRefO = externalRef ? externalRef.current : elementRef.current;
        const onChange = (entries, observer) => {
            const element = entries[0];
            if (element.isIntersecting) {
                setShow(true)
                one && observer.disconnect();
            } else {
                !one && setShow(false);
            }
        }

        Promise.resolve(
            typeof IntersectionObserver != 'undefined'
                ? IntersectionObserver
                : import('intersection-observer')
        ).then(() => {
            observer = new IntersectionObserver(onChange, {
                rootMargin: '100px'
            });
            if (elementRefO) observer.observe(elementRefO);

        })


        return () => observer && observer.disconnect();
    })
    return { show, elementRef }

}

export default UseNearScreen