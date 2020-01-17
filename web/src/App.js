import React ,{useState,useEffect} from 'react';
import './services/api'


import './App.css';
import './global.css'
import './App.css'
import './Main.css'
import api from './services/api';
import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

function App() { 

  const [devs,setDevs] = useState([])

  async function handleAddDev(data){

    const response = await api.post('./devs',data)

    //Pra manter conceito de imutabilidade precisa copiar os devs e entao adiiconar o proximo 
    // [...ultimoItem, valorAdicuionado]
    setDevs([...devs,response.data])
  }

  useEffect(()=>{
    async function loadDevs(){
      const response = await api.get('/devs')

      setDevs(response.data)
    }

    loadDevs()
  },[])

  

  return (
    <div id="app">
      <aside>
        <strong >Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
          <ul>
            {devs.map(dev => (
              <DevItem key={dev._id}  dev={dev}/>
            ))}
            
          </ul>
      </main>
    </div> 
  );
}
 
export default App;
