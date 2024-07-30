
import { useNavigate } from 'react-router-dom';

export const Body = () => {
    const navigate=useNavigate();
    const gologin=()=>{
        navigate('/login')
    }
    return (
        <div className='flex flex-col lg:flex-row items-center ml-10'>
            <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
                
                <h1 className="font-bebas-neue uppercase text-6xl sm:text-6xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                    Deliciousness 
                    <span className="w-90 h-2 bg-gray-800 dark:bg-white mb-4">
                </span>
                    <span className="text-6xl sm:text-6xl">
                    delivered right to your door.
                    </span>
                </h1>
                
                <div className="flex mt-8">
                    <button onClick={gologin} className="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400">
                        Get started
                    </button>
                    <button className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 dark:text-white hover:bg-pink-500 hover:text-white text-md">
                        Read more
                    </button>
                </div>
            </div>
            <div className='lg:h-[700px] md:h-[550px] hidden md:block'>
                <img className='lg:h-[600px] lg:w-[850px] md:h-[450px] md:w-[550px]' src="./images/food-image.png" alt="food" />
            </div>
        </div>
    );
};

export default Body;