import './App.css';
import React, {useState,useEffect} from 'react';
import Api from './Api'


function App(){
const [nomes, setNomes] = useState([]);

async function initApi(){


  let pegaNomes = await Api.getPersons();

  setNomes(pegaNomes);


}

useEffect(() => {

  initApi();

},[]);


  

  return(
    <div>
      {
        nomes.map((data)=>{
          return(
            <div>
              <h2>{data.name} | {data.email}</h2>
            </div>
          )
        })
      }

    </div>
  )


}



export default App;
