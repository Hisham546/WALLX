import { createContext,useState } from 'react';

 const Context = createContext('Default Value');

    const Provider =({children}) => {
  const [value,setValue]=useState('hello');
const [theme, setTheme]=useState('');

  const updateValue = (newValue) => {
      setValue(newValue);
    };
    const updateTheme =(newTheme) =>{
            setTheme(newTheme)
    }
      return(
      <Context.Provider value={{value,theme,updateValue,updateTheme}}>
      {children}
      </Context.Provider>


      )

    }

    export {Context,Provider};