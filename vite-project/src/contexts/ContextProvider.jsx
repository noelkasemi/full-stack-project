import { useContext } from "react";
import { createContext, useState } from "react";
import PropTypes from 'prop-types'

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState(
        {name: 'John'}
    );
    const [token, _setToken] = useState(localStorage.getItem('ACCSESS_TOKEN'));

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCSESS_TOKEN', token)
        } else {
            localStorage.removeItem('ACCSESS_TOKEN')
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }} >
            {children}
        </StateContext.Provider>
    )
}
ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useStateContext = () => useContext(StateContext)