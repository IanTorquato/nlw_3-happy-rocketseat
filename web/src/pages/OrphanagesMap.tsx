import React, { useEffect, useState } from 'react'
import { FiArrowRight, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import api from '../services/api'
import mapIcon from '../utils/mapIcon'
import mapMarker from '../images/map-marker.svg'

import '../styles/pages/orphanages-map.css'

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
  // about: string,
  // instructions: string,
  // opening_hours: string,
  // open_on_weekends: boolean,
  // images: { id: number, url: string }[]
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([] as Orphanage[])

  useEffect(() => {
    api.get('/orphanages')
      .then(({ data }) => setOrphanages(data))
      .catch(({ response }) => {
        const { message, errors } = response.data

        if (!message) {
          console.log(response)
          return alert('Falha ao listar os orfanatos!')
        }

        console.error(errors)
        alert(message)
      })
  }, [])

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarker} alt="Logo Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita</p>
        </header>

        <footer>
          <strong>Rio do Sul</strong>
          <span>Santa Catarina</span>
        </footer>
      </aside>

      <Map center={[-28.3314516, -49.0334413]} zoom={14} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {orphanages.map(orphanage => (
          <Marker key={orphanage.id} position={[orphanage.latitude, orphanage.longitude]} icon={mapIcon} >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}><FiArrowRight size={20} color="#fff" /></Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  )
}

export default OrphanagesMap
