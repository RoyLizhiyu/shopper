import {useContext,useState} from 'react';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import {Outlet, Link} from 'react-router-dom';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase,.utils';
import './navigation.styles.scss'
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown';

function Navigation() {
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

  const signOutHandler = async ()=>{
    await signOutUser();
  }
  return (
      <>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrwnLogo className='logo'/>
            </Link>

            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                SHOP
                </Link>
                {currentUser===null ? (
                  <Link className='nav-link' to='/auth'>
                SIGN IN
                </Link>
                ):(
                  <span className='nav-link' onClick={signOutHandler}>
                SIGN OUT
                </span>
                )}
                <CartIcon />

            </div>
            {isCartOpen && <CartDropDown />}
        </div>
        <Outlet />
      </>

  )
}

export default Navigation