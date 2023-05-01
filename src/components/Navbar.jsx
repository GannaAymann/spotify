import React from 'react';
import style from './NavBr.module.css';
import { useStateProvider } from '../utils/StateProvider';
import {CgProfile} from 'react-icons/cg'
import {FaSearch} from 'react-icons/fa'
const Navbar = () => {
    const [{userInfo}]=useStateProvider();
    return (
        <div className={style.TheCountainer}>
            <div className={style.Search}>
             <FaSearch/>
             <input type='text' placeholder='What do you want to listen to ? '/>
             </div>
             <div className={style.profile}>
                <a href='#'>
                    <CgProfile/>
                    <span >{userInfo?.name}</span>
                </a>

             </div>
        </div>
    );
}

export default Navbar;
