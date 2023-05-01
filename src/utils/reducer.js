import { reducerCases } from "./Constants";

export const initialState ={
    token:null,
    playlists:[],
    userInfo:"",
    Selected_PlayList_ID:"1sFzheYwoR8jNRnqmqFrMM",
    SelectedPlayList:null
}
const reducer =(state,action)=>{
    switch(action.type)
    {   
        case reducerCases.SET_TOKEN:{
            return {
                ...state,token:action.token,
            }
        }

        case reducerCases.SET_PLAYLISTS:{
            return{
                ...state,
                playlists:action.playlists,
            }
        }

        case reducerCases.SET_USER:{
            return{
                ...state,
                userInfo:action.userInfo,
            }
        }
        case reducerCases.SET_SELECTED_PLAYLIST:{
            return {
                ...state,
                SelectedPlayList:action.SelectedPlayList
            }
        }
        default:return state;
    }
}
export default reducer 