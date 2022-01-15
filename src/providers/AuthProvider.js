import { createContext } from "react";

const AuthContext = createContext()


const AuthProvider = ({ children }) => {
  const [email, ]

  return (
    <AuthContext.Provider>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider