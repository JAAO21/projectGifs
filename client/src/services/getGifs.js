import { API_KEY, API_Url } from "./settings";

const getGifs = async ({ keyword='bulma', rating='g', page = 0,lenguage='en' }) => {
    const url = `${API_Url}/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=10&offset=${page * 10}&rating=${rating}&lang=${lenguage}`;

    return await fetch(url)
        .then(res => res.json())
        .then(response => {
            const { data = [] } = response
            if (Array.isArray(data)) {
                const gifs = data.map(image => {
                    const { title, id, images } = image;
                    const { url } = images.downsized_medium
                    return { title, id, url }
                })
                return gifs;

            }
        })
}
export default getGifs;