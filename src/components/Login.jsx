import React from 'react';
import style from './Login.module.css'
const Login = () => {
    const HandleClick=()=>{
        const client_id = '0bfc42b7c6264a6b9dfd9be97202f6b8';
        const redirect_url = "http://localhost:3000/";
        const api_url = 'https://accounts.spotify.com/authorize';
        
        const scope =[
            "user-read-private",
            "user-read-email",
            "user-modify-playback-state",
            "user-read-playback-state",
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-top-read",
        ];
        window.location.href=`${api_url}?client_id=${client_id}&redirect_uri=${redirect_url}&scope=${scope.join(
            " "
        )}&response_type=token&show_dialog=true`;

    }
    return (
        
        <div className={style.Div}>
            <img className= {style.imgg}src = './images/Spotify_Logo_RGB_Black.png' alt ="spotify"
             />
             <button className={style.buttonn} onClick={HandleClick}><span>Connect Spotify</span></button>
        </div>
    );
}

export default Login;
