import { Link } from "react-router-dom";
import Header from "../components/Header";

const Missing = () => {
    return (
        <section 
            className="h-screen w-screen relative" 
            style={{
                backgroundImage: 'url(/404.jpg)',
                backgroundSize: 'contain', 
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'center' 
            }}
        >
            <Header />            
            <Link 
                to="/" 
                className="absolute top-[600px] sm:top-[680px] w-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600 text-lg  bg-white rounded-md py-2 font-semibold hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-5 block text-center"
            >
                Visit Our Homepage
            </Link>
        </section>
    );
}

export default Missing;
