import './Index.css'
import React, { useState, useEffect } from 'react'
import Monster_original from '../../Img/Monster_original.png'
import { Link } from 'react-router-dom'


function Store(){

  interface Monster {
    id: number;
    nom: string;
    image: string;
    nombre: number;
    _id: string;
  }  

  const [data, setData] = useState<Monster[]>([]);

    useEffect(() => {

      // Appel à votre API pour récupérer la liste de données
      fetch('http://localhost:7001/api/getMonsters')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Erreur lors de la récupération des données :', error));
    }, []);
    return(
      <div>
        <div className='Corp'> 
        {data.map(item => (
          <div key={item.id} className='Monster'>
            <img src={item.image} alt="Description de l'image" className='Monster_Canette'/>
            <Link to={`/Store/${item.id}?nombre=${item.nombre}&images=${item.image}&_id=${item._id}&id=${item.id}`} className='title'>{item.nom}</Link>
          </div>
          ))}
        </div>
        <div className='btn'>
          <Link to='/' className='btn_retour'>Retour</Link>
          <Link to='/Add' className='btn_retour'>Ajout</Link>
        </div>
      </div>
    )
}


export default Store;