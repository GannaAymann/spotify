import React from 'react';
import style from './SideBar.module.css'
import {MdSearch , MdHome} from 'react-icons/md'
import {IoLibraryOutline} from 'react-icons/io5'
import PlayLists from './PlayLists';
const Sidebar = () => {
    return (
        <div className={style.TheContainer}>
            <div className={style.top_links}>
                <div className={style.logo}>
                <img className ={style.imgg}src = './images/Spotify-Logo.png' alt ="spotify"/>
                     
                </div>
                <ul>
                    <li>
                        <MdHome/>
                        <span>
                            Home
                        </span>
                    </li>
                    <li>
                        <MdSearch/>
                        <span>
                            Search
                        </span>
                    </li>
                    <li>
                        <IoLibraryOutline/>
                        <span>
                            Your Library
                        </span>
                    </li>
                </ul>

            </div>
            <PlayLists/>
        </div>
    );
}

export default Sidebar;
