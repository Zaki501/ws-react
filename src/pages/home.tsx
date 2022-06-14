import { Outlet } from "react-router-dom"

const Home = (props: {}) => {
    return (
        <div>
            <h2>    
                HOME PAGE!!
            </h2>
            <Outlet />
        </div>
    )
}

export default Home