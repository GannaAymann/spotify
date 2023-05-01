
import React ,{useEffect} from 'react';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios'
import { reducerCases } from '../utils/Constants';
import style from './PlayLists.module.css'
const PlayLists = () => {
    const[{token,playlists},dispatch]=useStateProvider();
    useEffect(()=>{
        const playListData=async()=>{
            const res = await axios.get("https://api.spotify.com/v1/me/playlists",
            {
                headers:{
                    Authorization:"Bearer "+token,
                    "Content-Type":"application/json",

                }
            })
            
            const {items}=res.data;
            const playlists =items.map(({name,id})=>{
                return {name,id}});
            dispatch({type:reducerCases.SET_PLAYLISTS,playlists})
            console.log(playlists);
         };
        playListData();
    },[token,dispatch])

    
    return (
        <div className={style.TheContainer}>
            <div className={style.headerDiv}>
                <span className={style.Theheader}> PlayLists</span>
            </div> 
          <ul>
          {
                playlists.map(({name,id})=>{
                    return(
                        <li className ={style.listStyle}key ={id}>{name}</li>
                        

                    )
                })
            }
          </ul>
           
            
            
        </div>
    );
}

export default PlayLists;
