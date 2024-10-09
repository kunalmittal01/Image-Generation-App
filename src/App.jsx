import { useState,useReducer } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const reducerFn = (state,action)=>{
    switch(action.type){
      case 'SET_INPUT':
        return {...state, input: action.payload };
      case 'SET_IMAGES':
        if(action.payload == 'Error fetching images') {
          return {...state, images: ['Error fetching images'] };
        }
        const images = action.payload?.data.results?.map(img=>img.urls.small);
        console.log(images,action.payload);
        
        return {...state, images: images};
      default:
        return state;
  
  }
}
  const [state, dispatch] = useReducer(reducerFn, {
    input: '',
    images: []
  });
  
  async function getImage(input) {
    try {
      const resp = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${input}&client_id=RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw`);
      return resp;
    }
    catch (err) {
      console.error('Error fetching images:', err);
      return 'Error fetching images';  
    }
  }

  return (
    <>
      <nav>
        <p>Image Generation App</p>
      </nav>
      <div className="container">
        <div className="input-cont">
          <p>What's On Your Mind ?</p>
          <input onKeyUp={async (e)=>dispatch({type: (e.key!= 'Enter')?'SET_INPUT':'SET_IMAGES',payload: (e.key!= 'Enter')?e.target.value:await getImage(e.target.value)})} type="text" placeholder="Enter Query Then Hit Enter...."/>
        </div>
        <div className="output">
          {
            state.images?.length > 0 && state.images?.map((image, index)=>(
              <div class="image">
                <img key={index} src={image} alt="random image"/>
              </div>  
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App;
