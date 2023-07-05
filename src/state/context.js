import { createContext,useState } from 'react';

 const Context = createContext('Default Value');

    const Provider =({children}) => {
  const [value,setValue]=useState('');

  const updateValue = (newValue) => {
      setValue(newValue);
    };
      return(
      <Context.Provider value={{value,updateValue}}>
      {children}
      </Context.Provider>


      )

    }

    export {Context,Provider};