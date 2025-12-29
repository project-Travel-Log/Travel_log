    import { createContext, useEffect, useState } from 'react'
    import { getMe } from '../API/auth'

    export const AuthContext = createContext()

    export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if (!token) {
        setLoading(false)
        return
        }

        getMe()
            .then(res => {
                setUser(res.data)
            })
            .catch((err) => {
                if (err.response?.status === 401){
                localStorage.removeItem('access_token')
                setUser(null)
                }
            })
            .finally(() => setLoading(false))
    }, [])

    const logout = () => {
        localStorage.removeItem('access_token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
    }
