import React, { useState, useEffect } from 'react';
import '../Home/Index.css'
import Monster_original from '../../Img/Monster_original.png'
import { Link } from 'react-router-dom';


function Home(){

  const [totalCanettes, setTotalCanettes] = useState(0);

  useEffect(() => {
    fetch('http://localhost:7001/api/getTotalCanettes')
      .then(response => response.json())
      .then(data => {
        // Récupère le total depuis la réponse
        setTotalCanettes(data.totalCanettes);
      })
      .catch(error => console.error('Error fetching total Canettes:', error));
  }, []);

    return(
        <div>
            <div className='container'>
                <img src={Monster_original} alt="Description de l'image" className='image'/>
                <div className='title'>Nombres: {totalCanettes} </div>
            </div>
            <div className='btn'>
                <a href="mailto:fayad-idriss.bacari@outlook.com" className='btn_email'>Email</a>
                <Link to='/Store' className='btn_suivant'>Suivant</Link>
            </div>
        </div>
    )

}

export default Home;