
import UseNearScreen from 'hooks/UseNearScreen';
import React,{Suspense} from 'react';

 

const TrendingSearches = React.lazy(
    ()=> import('./TrendingSearches.js')
);

const LazyTrending = () => {
    const {show, elementRef} = UseNearScreen();
    return <div ref={elementRef}>
        <Suspense fallback={'loanding..'}>
        {show ? <TrendingSearches /> : <p>Loanding .. </p>}
        </Suspense>
    </div>
}

export default LazyTrending;