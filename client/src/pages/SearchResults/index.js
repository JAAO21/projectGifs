import { useCallback, useRef, useEffect } from 'react';
import debounce from 'just-debounce-it';
import { Helmet } from 'react-helmet';
import UseGifs from 'hooks/useGifs.js';
import Spinner from 'components/Spinner/Spinner.js';
import ListOfGifs from 'components/ListOfGifs/ListOfGifs.js';
import UseNearScreen from 'hooks/UseNearScreen';

import './index.css'
import Form from 'components/Form/Form';

export const SearchResult = (props) => {
    const { keyword, rating = 'g' } = props.params
    const { gifs, loading, setPage } = UseGifs({ keyword, rating });
    const externalRef = useRef();
    const { show } = UseNearScreen({ externalRef: loading ? null : externalRef, one: false });

    const titlePage = gifs ? `${gifs.length} results of ${keyword}` : 'null';

    const debounceHandleNextPage = useCallback(debounce(
        () => setPage(prevPage => prevPage + 1), 1000
    ), [setPage])

    useEffect(() => {
        if (show) debounceHandleNextPage();
    }, [debounceHandleNextPage, show])

    return (
        <div>
            {
                loading ?
                    <>
                        <Helmet>
                            <time>Cargando ...</time>
                        </Helmet>
                        <Spinner />
                    </>
                    :
                    <>
                        <Helmet>
                            <time>{titlePage}</time>
                            <meta name="description" content={gifs ? gifs : 'null'} />
                        </Helmet>

                        <Form initialKeyword={keyword} initialRating={rating} />

                        <ListOfGifs gifs={gifs} />
                    </>
            }
            <div id='visor' ref={externalRef}></div>
        </div>
    )
}   