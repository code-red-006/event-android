import {createContext, useState} from 'react';

export const ProgramContext = createContext(null);

function Program({children}) {
  const [single, setSingle] = useState(null);
  const [user, setUser] = useState(null);
  const [groupe, setGroupe] = useState(null);
  const [enrolledSingle, setEnrolledSingle] = useState(null);
  const [enrolledGroupe, setEnrolledGroupe] = useState(null);
  const [house, setHouse] = useState(null);
  const [admNo, setAdmNo] = useState(null);

  return (
    <>
      <ProgramContext.Provider
        value={{
          admNo,
          setAdmNo,
          single,
          setSingle,
          groupe,
          setGroupe,
          enrolledSingle,
          setEnrolledSingle,
          enrolledGroupe,
          setEnrolledGroupe,
          user,
          setUser,
          house,
          setHouse,
        }}>
        {children}
      </ProgramContext.Provider>
    </>
  );
}

export default Program;
