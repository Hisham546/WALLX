import { createContext,useState } from 'react';

 const Context = createContext('Default Value');

    const Provider =({children}) => {
  const [value,setValue]=useState('');
      return(
      <Context.Provider value={value}>
      {children}
      </Context.Provider>


      )

    }
    export {Context,Provider};