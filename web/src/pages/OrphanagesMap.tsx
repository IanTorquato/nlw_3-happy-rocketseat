import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Map, TileLayer } from 'react-leaflet'

import mapMarker from '../images/map-marker.svg'

import '../styles/pages/orphanages-map.css'
import 'leaflet/dist/leaflet.css'

const OrphanagesMap: React.FC = () => {
	return (
		<div id="page-map">
			<aside>
				<header>
					<img src={mapMarker} alt="Logo Happy" />

					<h2>Escolha um orfanato no mapa</h2>
					<p>Muitas crianças estão esperando a sua visita :)</p>
				</header>

				<footer>
					<strong>Rio do Sul</strong>
					<span>Santa Catarina</span>
				</footer>
			</aside>

			<Map center={[-28.3314516, -49.0334413]} zoom={16} style={{ height: '100%', width: '100%' }}>
				<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			</Map>

			<Link to="" className="create-orphanage">
				<FiPlus size={32} color="#fff" />
			</Link>
		</div>
	)
}

export default OrphanagesMap