
import { useNavigate,Link } from 'react-router-dom';
const Header = () => {
    return (
        <div className='flex items-center justify-between mt-10'>

            <div className='flex '>
                <img className='h-20 w-[60px]' src="./images/logo.png" alt="logo" />
            </div>
            

            <ul className='lg:flex gap-14 hidden mr-10'>
                <li className='text-black text-xl'><Link to="/About">About</Link></li>
                <li className='text-black text-xl'><Link to="/deliveryreg">Join us</Link></li>
                <li className='text-black text-xl'><Link to="/login">Login</Link></li>
                <li className='text-black text-xl'><Link to="/restaurantreg">Add Restaurant</Link></li>
            </ul>

            {/*<img src="./images/cart.png" alt="cart" className='h-12'/>*/}

        </div>
    )
}

export default Header;