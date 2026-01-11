import { Helmet } from "react-helmet";
import UseGifs from 'hooks/useGifs';
import ListOfGifs from 'components/ListOfGifs/ListOfGifs';
import Trending from 'components/TrendingSearches/index';
import Footer from 'components/Fotter/Footer';
import Form from 'components/Form/Form';
import Spinner from "components/Spinner/Spinner";

import './home.css'

const Home = () => {
    const { gifs, loading } = UseGifs()
    
    return (
        <>
            <Helmet>
                <title>Home Gifi</title>
            </Helmet> 
            {
                loading ?
                    <Spinner/>
                    :
                    <div>
                        <Form />
                        <h3 className='h3HomeLastSearch'>The last search</h3>
                        <ListOfGifs gifs={gifs} />
                        <h3 className='h3Home'>The most popular gifs</h3>
                        <Trending />
                        <Footer />
                    </div>
            }

        </>
    )
}

export default Home;