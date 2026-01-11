import Gifs from '../Gifs/Gifs.js';
import './styleListOfGifs.css'
const ListOfGifs = ({ gifs }) => {
    const MapGIfs =
        gifs?.map(singleGifs =>
            <Gifs
                key={singleGifs.id}
                id={singleGifs.id}
                title={singleGifs.title}
                url={singleGifs.url}
            />)

    return (
        <div className='styleListOfGifs'>
            {MapGIfs}
        </div>
    )

}
export default ListOfGifs;