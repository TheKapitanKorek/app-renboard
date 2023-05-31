import axios from 'axios';

const gameSocketsAPI = axios.create({
  baseURL: process.env.GAME_SOCKETS_SERVICE || 'http://localhost:3001',
  timeout: 35000,
})

export const createRoom = async (userId:string, playFriend:boolean)=>{
  try{
    console.log('try call')
    const response = await gameSocketsAPI.post('/game/room', {userId, playFriend})
    return response.data
  }catch(err){
    console.error('There was a problem making a request');
    console.log(err);
    throw err;
  }
}
