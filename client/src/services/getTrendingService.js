import {API_KEY,API_Url } from './settings';


const getTrendingTerms = async () => {
    
    const url = `${API_Url}/trending/searches?api_key=${API_KEY}`;

    return await fetch(url)
        .then(res => res.json())
        .then(response => {
            const { data = [] } = response
            return data;
        })
}
export default getTrendingTerms;