import React, { useState } from 'react'
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Alert, Image, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

import api from '../../services/api'

interface ParamsRoute {
	position: { latitude: number, longitude: number }
}

const OrphanageData: React.FC = () => {
	const [name, setName] = useState('')
	const [about, setAbout] = useState('')
	const [instructions, setInstructions] = useState('')
	const [opening_hours, setOpeningHours] = useState('')
	const [open_on_weekends, setOpenOnWeekends] = useState(true)
	const [images, setImages] = useState<string[]>([])

	const { navigate } = useNavigation()

	const route = useRoute()
	const params = route.params as ParamsRoute

	async function handleSelectImages() {
		const { status } = await ImagePicker.requestCameraRollPermissionsAsync()

		if (status !== 'granted') { return Alert.alert('Opss', 'Precisamos acessar sua galeria...') }

		const result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true, quality: 1, mediaTypes: ImagePicker.MediaTypeOptions.Images
		})

		if (result.cancelled) { return }

		const { uri: image } = result

		setImages([...images, image])
	}

	function handleCreateOrphanage() {
		const { latitude, longitude } = params.position

		const data = new FormData()

		data.append('name', name)
		data.append('about', about)
		data.append('instructions', instructions)
		data.append('opening_hours', opening_hours)
		data.append('open_on_weekends', String(open_on_weekends))
		data.append('latitude', String(latitude))
		data.append('longitude', String(longitude))
		images.forEach((image, index) => (
			data.append('images', { name: `image_${index}.jpg`, type: 'image/jpg', uri: image } as any)
		))

		api.post('orphanages', data)
			.then(() => {
				Alert.alert('Sucesso', 'Cadastro realizado!', [{ text: 'Voltar', onPress: () => navigate('OrphanagesMap') }])
			})
			.catch(({ response }) => {
				const { message, errors } = response.data

				if (!message) {
					console.log(response)
					return Alert.alert('Erro', 'Falha ao listar dados do orfanato!')
				}

				console.error(errors)
				Alert.alert('Erro', message)
			})
	}

	return (
		<ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
			<Text style={styles.title}>Dados</Text>

			<Text style={styles.label}>Nome</Text>
			<TextInput style={styles.input} value={name} onChangeText={setName} />

			<Text style={styles.label}>Sobre</Text>
			<TextInput style={[styles.input, { height: 110 }]} value={about} onChangeText={setAbout} maxLength={300} multiline />

			<Text style={styles.label}>Fotos</Text>

			<FlatList style={styles.uploadedImagesContainer} data={images} keyExtractor={image => image} numColumns={4}
				renderItem={({ item }) => <Image source={{ uri: item }} style={styles.uploadedImage} />}
			/>

			<TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
				<Feather name="plus" size={24} color="#15b6d6" />
			</TouchableOpacity>

			<Text style={styles.title}>Visitação</Text>

			<Text style={styles.label}>Instruções</Text>
			<TextInput style={[styles.input, { height: 110 }]} value={instructions} onChangeText={setInstructions} multiline />

			<Text style={styles.label}>Horario de visitas</Text>
			<TextInput style={styles.input} value={opening_hours} onChangeText={setOpeningHours} />

			<View style={styles.switchContainer}>
				<Text style={styles.label}>Atende final de semana?</Text>

				<Switch value={open_on_weekends} onValueChange={setOpenOnWeekends} thumbColor="#fff"
					trackColor={{ false: '#ccc', true: '#39cc83' }} />
			</View>

			<RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
				<Text style={styles.nextButtonText}>Cadastrar</Text>
			</RectButton>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	title: {
		color: '#5c8599',
		borderBottomColor: '#d3e2e6',
		borderBottomWidth: 0.8,
		fontFamily: 'Nunito_700Bold',
		fontSize: 24,
		marginBottom: 32,
		paddingBottom: 24
	},

	label: {
		color: '#8fa7b3',
		fontFamily: 'Nunito_600SemiBold',
		marginBottom: 8
	},

	uploadedImagesContainer: {
		flexDirection: 'row'
	},

	uploadedImage: {
		borderRadius: 20,
		flexBasis: 0,
		height: 64,
		marginBottom: 8,
		marginLeft: 1.5,
		marginRight: 16,
		width: 64
	},

	comment: {
		color: '#8fa7b3',
		fontSize: 11
	},

	input: {
		backgroundColor: '#fff',
		borderColor: '#d3e2e6',
		borderRadius: 20,
		borderWidth: 1.4,
		height: 56,
		marginBottom: 16,
		paddingHorizontal: 24,
		paddingVertical: 18,
		textAlignVertical: 'top'
	},

	imagesInput: {
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		borderColor: '#96d2f0',
		borderRadius: 20,
		borderStyle: 'dashed',
		borderWidth: 1.4,
		height: 56,
		justifyContent: 'center',
		marginBottom: 32,
		marginTop: 24
	},

	switchContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 16
	},

	nextButton: {
		alignItems: 'center',
		backgroundColor: '#15c3d6',
		borderRadius: 20,
		height: 56,
		justifyContent: 'center',
		marginTop: 32
	},

	nextButtonText: {
		color: '#fff',
		fontFamily: 'Nunito_800ExtraBold',
		fontSize: 16
	}
})

export default OrphanageData