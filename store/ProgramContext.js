import {createContext, useState} from 'react';

export const ProgramContext = createContext(null);

function Program({children}) {
  const [single, setSingle] = useState(null);
  const [groupe, setGroupe] = useState(null);

  return (
    <>
      <ProgramContext.Provider value={{single, setSingle, groupe, setGroupe}}>
        {children}
      </ProgramContext.Provider>
    </>
  );
}

export default Program;
