import React, { useContext, useState } from 'react'

const ThemeContext = React.createContext();

// A Hook to use in the components, so day can get the data easily
function useThemeContext() {
    const  theme = useContext(ThemeContext)
    return theme
}

const themes = {
    light: {background: 'white', color: 'black', border: '1px solid black'},
    dark: {background: 'black', color: 'white', border: '1px solid white'},
}

// HOC to provide the teme, now the main components looks cleaner, we just passed the logic to a High Order Component
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light")

    function toggleTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    const providerValue = { theme: themes[theme], toggleTheme }

    return(
        <ThemeContext.Provider value={providerValue} >
            {children}
        </ThemeContext.Provider>
    )
}

const Toggle = ( ) => {
    const theme = useThemeContext()
    return(
        <label>
            Dark Mode
            <input type="checkbox" onClick={theme.toggleTheme} />
            <span />
        </label>
    )
}

const Box = () => {
    const theme = useThemeContext()
    return(
        <div style={theme.theme} >
            Pokemon
        </div>
    )   
}

const TestingThemeProvider = () => {

    return(
        <ThemeProvider >
            <Toggle />
            <Box />
        </ThemeProvider>
    )
}

export default TestingThemeProvider