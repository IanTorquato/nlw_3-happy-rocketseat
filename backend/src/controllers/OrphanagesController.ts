import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import Orphanage from '../models/Orphanage'
import orphanages_view from '../view/orphanages_view'

export default {
	async create(request: Request, response: Response) {
		const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends } = request.body
		const requestImages = request.files as Express.Multer.File[]

		const images = requestImages.map(image => ({ ...image, path: image.filename }))

		const orphanagesRepository = getRepository(Orphanage)

		const data = {
			name, latitude, longitude, about, instructions, opening_hours,
			open_on_weekends: open_on_weekends === 'true', images
		}

		const schema = Yup.object().shape({
			name: Yup.string().required('O campo "name" é obrigatório.'),
			latitude: Yup.number().required('O campo "latitude" é obrigatório.'),
			longitude: Yup.number().required('O campo "longitude" é obrigatório.'),
			about: Yup.string().required('O campo "about" é obrigatório.').max(300, 'O campo "about" aceita até 300 caracteres.'),
			instructions: Yup.string().required('O campo "instructions" é obrigatório.'),
			opening_hours: Yup.string().required('O campo "opening_hours" é obrigatório.'),
			open_on_weekends: Yup.boolean().required('O campo "open_on_weekends" é obrigatório.'),
			images: Yup.array(
				Yup.object().shape({
					path: Yup.string().required('O campo "path" é obrigatório.')
				}))
		})

		await schema.validate(data, { abortEarly: false })

		const orphanage = orphanagesRepository.create(data)

		await orphanagesRepository.save(orphanage)

		return response.status(201).json(orphanage)
	},

	async index(request: Request, response: Response) {
		const orphanagesRepository = getRepository(Orphanage)

		const orphanages = await orphanagesRepository.find({ relations: ['images'] })

		return response.json(orphanages_view.renderMany(orphanages))
	},

	async show(request: Request, response: Response) {
		const { id } = request.params
		const orphanagesRepository = getRepository(Orphanage)

		const orphanage = await orphanagesRepository.findOneOrFail(id, { relations: ['images'] })

		return response.json(orphanages_view.render(orphanage))
	}
}