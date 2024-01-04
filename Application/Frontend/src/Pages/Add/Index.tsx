import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FormEvent } from 'react'; 
import './Index.css'

function Add() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const _id = params.get('_id');

  const [formData, setFormData] = useState({
    nom: '',
    nombre: '',
    image: '',
  });
  

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Utiliser l'API PUT si _id est présent, ou utiliser l'API POST
      const method = _id ? 'PUT' : 'POST';

      const response = await fetch(`http://localhost:7001/api/updateMonster${_id ? `/${_id}` : ''}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(`Données ${_id ? 'modifiées' : 'envoyées'} avec succès!`);
        window.location.replace('/Store');
      } else {
        console.error(`Erreur lors de ${_id ? 'la modification' : 'l\'envoi'} des données`);
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };
  return (
    <div className="Application">
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
          />
        </label>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </label>
        <label>
          Image:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </label>
        <div className='form_button'>
          <Link to='/Store' className='btn_retour'>Retour</Link>
          <button type="submit">Envoyer</button>
        </div>
      </form>
    </div>
  );
}

export default Add;