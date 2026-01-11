
import { useState, useEffect } from 'react'
import { Link } from 'wouter';

import GetTrendingTerms from 'services/getTrendingService'

import './TrendingSearches.css';

const TrendingSearches = () => {
    const [trending, setTrendig] = useState([]);

    useEffect(() => {
        GetTrendingTerms().then(gt => {
            setTrendig(gt)
        })
    }, [])
    return (
        <div className='containerTrendingSearches'>
            {
                trending?.map((gtd, index) => (

                    <ul key={index} className='ulTrendingSearches'>
                        <Link href={`/search/${gtd}`} className='ulLinkTrendingSearches'> {gtd}</Link>
                    </ul>

                )
                )
            }
        </div>
    )
}

export default TrendingSearches;
