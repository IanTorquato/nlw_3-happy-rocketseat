import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// import { FaWhatsapp } from "react-icons/fa"
import { FiClock, FiInfo } from "react-icons/fi"
import { Map, Marker, TileLayer } from "react-leaflet"

import api from "../services/api"
import mapIcon from "../utils/mapIcon"
import Sidebar from "../components/Sidebar"

import '../styles/pages/orphanage.css'

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
  about: string,
  instructions: string,
  opening_hours: string,
  open_on_weekends: boolean,
  images: {
    id: number,
    url: string
  }[]
}

interface RouteParams {
  id: string
}

const Orphanage: React.FC = () => {
  const [orphanage, setOrphanage] = useState<Orphanage>()
  const [indexImageActive, setIndexImageActive] = useState(0)
  const params = useParams<RouteParams>()

  useEffect(() => {
    api.get(`/orphanages/${params.id}`)
      .then(({ data }) => setOrphanage(data))
      .catch(({ response }) => {
        const { message, errors } = response.data

        if (!message) {
          console.log(response)
          return alert('Falha ao listar dados do orfanato!')
        }

        console.error(errors)
        alert(message)
      })
  }, [params.id])

  if (!orphanage) { return <p>Carregando...</p> }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[indexImageActive].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((image, index) => (
              <button type="button" key={image.id} className={indexImageActive === index ? 'active' : ''}
                onClick={() => setIndexImageActive(index)}>

                <img src={image.url} alt={orphanage.name} />
              </button>
            ))}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map center={[orphanage.latitude, orphanage.longitude]} zoom={16} style={{ width: '100%', height: 280 }}
                dragging={false} touchZoom={false} zoomControl={false} scrollWheelZoom={false} doubleClickZoom={false}>
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                  target="_blank" rel="noopener noreferrer">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15b6d6" />
                Segunda à Sexta <br /> {orphanage.opening_hours}
              </div>

              {orphanage.open_on_weekends
                ? (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39cc83" />
                    Atendemos <br /> fim de semana
                  </div>
                ) : (
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#ff669d" />
                    Não atendemos <br /> fim de semana
                  </div>
                )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#fff" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Orphanage
