import { Link } from "react-router-dom";
import Header from "./Header";

const LandingPage = () => {
    return (
      <section className="h-screen w-screen flex flex-col items-center justify-between" style={{ backgroundImage: 'url(/bg.png)'}}>
            <Header/>
            <div className="flex flex-col items-center gap-1">
                <h1 className="text-4xl font-bold text-gray-700">Manage Your Expense</h1>
                <h1 className="text-4xl font-bold text-indigo-600">Control Your Money</h1>
                <h2 className="text-lg font-semibold text-gray-700">Start Creating Your Budget and Save a Ton of Money</h2>
                <Link 
                    to="/login" 
                    className="w-1/2 bg-indigo-600 rounded-md py-2 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-5 block text-center"
                    >
                    Get Started
                </Link>            
            </div>
            <div className="w-[900px] h-[480px] relative flex justify-center border rounded-xl overflow-hidden shadow-2xl">
            <img 
                src="/demo.png" 
                alt="Demo" 
                className="object-fit w-full h-full"
            />
            </div>
      </section>
    )
  }
  
  export default LandingPage;
  