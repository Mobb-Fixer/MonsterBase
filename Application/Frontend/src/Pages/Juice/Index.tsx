import React, { useEffect, useState} from 'react';
import './Index.css'
import Monster_original from '../../Img/Monster_original.png'
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function Juice(){ 

   //Appel Api pour charger les informations grâce au params()
   const location = useLocation();
   const params = new URLSearchParams(location.search);
 
   const id = params.get('id');
   const _id = params.get('_id')
   const nombre = params.get('nombre')
   const images = params.get('images')

   //Appel API pour la supprésion

   const handleDelete = async () => {
    try {
      await fetch(`http://localhost:7001/api/deleteMonster/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      window.location.replace('/Store');
    } catch (error) {
      console.error('Erreur lors de la suppression : ', error);
    }
  };
 
  return (
    <div>
        <div>
          <div className='container'>
            <img src={images ?? 'URL_PAR_DEFAUT'} alt="Description de l'image" className='image' />
            <div className='title'>Nombre: {nombre}</div>
          </div>
          <div className='btn'>
            <button onClick={handleDelete}>Supprimer</button>
            <Link to={`/Add?_id=${id}&id${id}`} className='btn_suivant'>
              Modifier
            </Link>
          </div>
          <div className='btn_div'>
            <Link to='/Store' className='button_retour'>
              Retour
            </Link>
          </div>
        </div>
    </div>
  );
}


export default Juice;