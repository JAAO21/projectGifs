
import { useReducer } from "react"

const Actions = {
    PUT_KEYWORD: 'put_keyword',
    PUT_RATING: 'put_rating',
    PUT_LENGUAGE: 'put_lenguage',
    RESET_KEYWORD: 'reset_keyword'
}

const reducer = (state, action) => {

    switch (action.type) {
        case Actions.PUT_KEYWORD:
            return {
                ...state,
                keyword: action.payload
            }
        case Actions.PUT_RATING:
            console.log(action.payload)
            return {
                ...state,
                rating: action.payload
            }
        case Actions.PUT_LENGUAGE:
            return {
                ...state,
                lenguage: action.payload
            }
        case Actions.RESET_KEYWORD:
            console.log(state)
            return {
               ...state,
                keyword:'',
                rating:'g',
                lenguage:'en'
            }

        default: break
    }
    return state;
}



const useForm = ({ initialKeyword = '', initialRating = 'g', initialLenguage = 'en' } = {}) => {
    const [state, dispatch] = useReducer(reducer, {
        keyword: decodeURIComponent(initialKeyword),
        rating: initialRating,
        lenguage: initialLenguage,

    })

    const { keyword, rating, lenguage } = state;

    return {
        keyword,
        rating,
        lenguage,
        updateKeyword: keyword => dispatch({ type: 'put_keyword', payload: keyword })
        , updateRating: rating => dispatch({ type: 'put_rating', payload: rating })
        , updateLenguage: lenguage => dispatch({ type: 'put_lenguage', payload: lenguage }),
        resetKeywor: () => dispatch({ type: 'reset_keyword' })
    }
}

export default useForm;