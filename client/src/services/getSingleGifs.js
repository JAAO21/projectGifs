import { API_KEY, API_Url } from "./settings";

const apiResponseToGifs = apiGifs => {
    const { data } = apiGifs;
    const { title, id, images } = data;
    const { url } = images.downsized_medium
    return { title, id, url }
}
const getSingleGifs = async ({ id }) => {
    const url = `${API_Url}/gifs/${id}?api_key=${API_KEY}`;
    return await fetch(url)
    .then(res => res.json())
        .then(apiResponseToGifs)
}

export default getSingleGifs;