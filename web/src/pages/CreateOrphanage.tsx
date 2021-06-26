import React, { ChangeEvent, FormEvent, useState } from "react"
import { useHistory } from "react-router-dom"
import { Map, Marker, TileLayer } from 'react-leaflet'
import { LeafletMouseEvent } from "leaflet"
import { FiPlus } from "react-icons/fi"

import api from "../services/api"
import mapIcon from "../utils/mapIcon"
import Sidebar from "../components/Sidebar"

import '../styles/pages/create-orphanage.css'

const CreateOrphanage: React.FC = () => {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [selectedImagesPreview, setSelectedImagesPreview] = useState<string[]>([])

  const { push } = useHistory()

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng
    setPosition({ latitude: lat, longitude: lng })
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) { return }

    const files = Array.from(event.target.files)

    setImages(files)

    const imagesPreview = files.map(file => {
      return URL.createObjectURL(file)
    })

    setSelectedImagesPreview(imagesPreview)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const { latitude, longitude } = position

    const data = new FormData()

    data.append('name', name)
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    images.forEach(image => data.append('images', image))

    api.post('orphanages', data)
      .then(() => {
        alert('Cadastro realizado com Sucesso!')

        push('/app')
      })
      .catch(({ response }) => {
        const { message, errors } = response.data

        if (!message) {
          console.log(response)
          return alert('Falha ao listar dados do orfanato!')
        }

        console.error(errors)
        alert(message)
      })
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map center={[-28.3314516, -49.0334413]} style={{ width: '100%', height: 280 }} zoom={14}
              onclick={handleMapClick}>
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {position.latitude !== 0 && (
                <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={event => setAbout(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {selectedImagesPreview.map(image => (
                  <img key={image} src={image} alt="Local Orfanato" />
                ))}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input type="file" id="image[]" multiple onChange={handleSelectImages} />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Nome</label>
              <input id="opening_hours" value={opening_hours} onChange={event => setOpeningHours(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends ? 'active' : ''} onClick={() => setOpenOnWeekends(true)}>
                  Sim
                </button>

                <button type="button" className={!open_on_weekends ? 'active' : ''} onClick={() => setOpenOnWeekends(false)}>
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit"> Confirmar </button>
        </form>
      </main>
    </div>
  )
}

export default CreateOrphanage
