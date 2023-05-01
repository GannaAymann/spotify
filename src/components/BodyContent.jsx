import React, { useEffect } from 'react';
import {AiFillClockCircle} from 'react-icons/ai'
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import style from './BodyContent.module.css'
import { reducerCases } from '../utils/Constants';
const BodyContent = () => {
    const [{token,Selected_PlayList_ID,SelectedPlayList},dispatch]=useStateProvider();

    useEffect(()=>{
        const IntialPlaylist=async()=>{
           const res = await axios.get(`https://api.spotify.com/v1/playlists/${Selected_PlayList_ID}`,
           {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
           });
         
           const SelectedPlayList ={
               id:res.data.id,
               name:res.data.name,
               description:res.data.description,
               image:res.data.images[0].url,
               tracks:res.data.tracks.items.map(({track})=>(
                {
                    id:track.id,
                    name:track.name,
                    artists:track.artists.map((artist)=>
                        artist.name
                    ),
                    image:track.album.images[2].url,
                    duration:track.duration_ms,
                    album:track.album.name,
                    context_uri:track.album.uri,
                    track_number:track.track.number
                }
               ))

           };
           dispatch({type:reducerCases.SET_SELECTED_PLAYLIST,SelectedPlayList})
           console.log(SelectedPlayList)
        };
        IntialPlaylist();
    },[token,dispatch,Selected_PlayList_ID]);

    const playTrack=async(
        id,
        name,
        artists,
        image,
        context_uri,
        track_number

    )=>{
        const res = await axios.get(`https://api.spotify.com/v1/me/player/play`,
        { 
            context_uri,
            offset:{
                position:track_number-1,
            },
             position_ms:0
        },
        {
            headers:{
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        });
        if(res.status===204)
        {
            const currentPlaying={
                id,
                name,
                artists,
                image
            };
            dispatch({type:reducerCases.SET_PLAYING,currentPlaying});
            dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:true});

        }
        else{
            dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:true});
        }
        
    };
    
        const msToMinutesAndSeconds=(ms)=>{
            var minutes =Math.floor(ms/60000);
            var seconds =((ms%60000)/1000).toFixed(0);
            return minutes +":"+(seconds<10? "0":"")+seconds;
        };
    
    
    return (
        
            <div className={style.TheContainer}>
                <div className={style.playlist}>
                    <div className={style.imageDivv}>
                        <img src ={SelectedPlayList.image} alt = "selected playlist"/>
                           
                    </div>
                    <div className={style.details}>
                        
                        <h1 className={style.title}>{SelectedPlayList.name}</h1>
                        <p className={style.description}>{SelectedPlayList.description}</p>                        
                    </div>
                </div>
                <div className={style.list}>
                     <div className={style.header_row}>
                        <div className={style.col}>
                            <span>#</span>
                        </div>
                        <div className={style.col}>
                            <span>Title</span>
                        </div>
                        <div className={style.col}>
                            <span>Album</span>
                        </div>
                        <div className={style.col}>
                            <span>
                                <AiFillClockCircle/>
                            </span>
                        </div>

                     </div>
                     <div className={style.tracks}>
                        {SelectedPlayList.tracks.map(({
                            id,
                            name,
                            artists,
                            image,
                            duration,
                            album,
                            context_uri,
                            track_number
                        },index
                        )=>{
                            return (
                                <div className={style.row}
                                key={id}
                                onClick={()=>playTrack(
                                    id,
                                    name,
                                    artists,
                                    image,
                                    context_uri,
                                    track_number
                                )}>
                                    <div className={style.col}>
                                        <span>{index+1}</span>
                                    </div>
                                    <div className={style.col_detail}>
                                        <div className={style.image}>
                                            <img src ={image} alt="track"/>
                                        </div>
                                        <div className={style.info}>
                                            <span className={style.name}>{name}</span>
                                            <span> || </span>
                                            <span>{artists}</span>
                                        </div>

                                    </div>
                                    <div className={style.col}>
                                        <span>{album}</span>
                                    </div>
                                    <div className={style.col}>
                                       <span>{msToMinutesAndSeconds(duration)}</span>
                                    </div>

                                    
                                    

                                </div>

                            );
                        })}
                     </div>
                </div>

            </div>
            
        
    );
}

export default BodyContent;
