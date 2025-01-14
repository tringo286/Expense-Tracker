import { Link } from 'react-router-dom'

const Home = () => {  

    return (
        <section className="flex flex-col items-center justify-start text-center gap-10 h-screen">
            <h1 className="text-4xl font-bold">Home</h1>           

            <div className="space-y-4">                               
                <div className="space-y-4"> 
                    <Link to="/admin" className="text-blue-500 hover:underline cursor-pointer text-xl block">Admin</Link>         
                </div>
            </div>                       
        </section>
    )
}

export default Home
