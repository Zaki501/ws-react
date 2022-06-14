import { Outlet } from "react-router-dom"

const Test1 = (props: {}) => {
    return (
        <div>
            <h2>
                Test1
            </h2>
            <Outlet />
        </div>
    )
}

export default Test1

