import React, { useEffect, useState } from 'react'
import { Image, View, ScrollView, Text, StyleSheet, Dimensions, Alert, TouchableOpacity, Linking } from 'react-native'
import { useRoute } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'

import api from '../services/api'
import mapMarkerImg from '../images/map-marker.png'

interface ParamsRoute {
	id: number
}

interface Orphanage {
	id: number,
	name: string,
	latitude: number,
	longitude: number,
	about: string,
	instructions: string,
	opening_hours: string,
	open_on_weekends: boolean,
	images: { id: number, url: string }[]
}

const OrphanageDetails: React.FC = () => {
	const [orphanage, setOrphanage] = useState<Orphanage>()

	const route = useRoute()
	const params = route.params as ParamsRoute

	useEffect(() => {
		api.get(`orphanages/${params.id}`)
			.then(({ data }) => setOrphanage(data))
			.catch(({ response }) => {
				console.error(response.data)
				return Alert.alert('Erro', 'Falha ao listar dados do orfanato.')
			})
	}, [])

	if (!orphanage) { return <View style={styles.container}><Text style={styles.about}>Carregando...</Text></View> }

	return (
		<ScrollView style={styles.container}>
			<View style={styles.imagesContainer}>
				<ScrollView horizontal pagingEnabled>
					{orphanage.images.map(image => (
						<Image style={styles.image} source={{ uri: image.url.replace('localhost', '192.168.0.107') }} key={image.id} />
					))}
				</ScrollView>
			</View>

			<View style={styles.detailsContainer}>
				<Text style={styles.title}>{orphanage.name}</Text>
				<Text style={styles.about}>{orphanage.about}</Text>

				<View style={styles.mapContainer}>
					<MapView style={styles.mapStyle} zoomEnabled={false} pitchEnabled={false} scrollEnabled={false}
						rotateEnabled={false} initialRegion={
							{ latitude: orphanage.latitude, longitude: orphanage.longitude, latitudeDelta: 0.006, longitudeDelta: 0.006, }
						}>

						<Marker icon={mapMarkerImg} coordinate={{ latitude: orphanage.latitude, longitude: orphanage.longitude }} />
					</MapView>

					<TouchableOpacity style={styles.routesContainer} onPress={() => {
						Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`)
					}}>
						<Text style={styles.routesText}>Ver rotas no Google Maps</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.separator} />

				<Text style={styles.title}>Instruções para visita</Text>
				<Text style={styles.about}>{orphanage.instructions}</Text>

				<View style={styles.scheduleContainer}>
					<View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
						<Feather name="clock" size={40} color="#2ab5d1" />

						<Text style={[styles.scheduleText, styles.scheduleTextBlue]}>Segunda à Sexta {orphanage.opening_hours}</Text>
					</View>

					{orphanage.open_on_weekends ? (
						<View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
							<Feather name="info" size={40} color="#39cc83" />

							<Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos fim de semana</Text>
						</View>
					) : (
							<View style={[styles.scheduleItem, styles.scheduleItemRed]}>
								<Feather name="info" size={40} color="#ff669d" />

								<Text style={[styles.scheduleText, styles.scheduleTextRed]}>Não atendemos fim de semana</Text>
							</View>
						)}
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	imagesContainer: {
		height: 240
	},

	image: {
		height: 240,
		resizeMode: 'cover',
		width: Dimensions.get('window').width
	},

	detailsContainer: {
		padding: 24
	},

	title: {
		color: '#4D6F80',
		fontFamily: 'Nunito_700Bold',
		fontSize: 30
	},

	about: {
		color: '#5c8599',
		fontFamily: 'Nunito_600SemiBold',
		lineHeight: 24,
		marginTop: 16
	},

	mapContainer: {
		backgroundColor: '#e6f7fb',
		borderColor: '#b3dae2',
		borderRadius: 20,
		borderWidth: 1.2,
		marginTop: 40,
		overflow: 'hidden'
	},

	mapStyle: {
		height: 150,
		width: '100%'
	},

	routesContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16
	},

	routesText: {
		color: '#0089a5',
		fontFamily: 'Nunito_700Bold'
	},

	separator: {
		backgroundColor: '#d3e2e6',
		height: 0.8,
		marginVertical: 40,
		width: '100%'
	},

	scheduleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 24
	},

	scheduleItem: {
		padding: 20,
		width: '48%'
	},

	scheduleItemBlue: {
		backgroundColor: '#e6f7fb',
		borderColor: '#b3dae2',
		borderRadius: 20,
		borderWidth: 1
	},

	scheduleItemGreen: {
		backgroundColor: '#edfff6',
		borderColor: '#a1e9c5',
		borderRadius: 20,
		borderWidth: 1
	},

	scheduleItemRed: {
		backgroundColor: '#fef6f9',
		borderColor: '#ffbcd4',
		borderRadius: 20,
		borderWidth: 1
	},

	scheduleText: {
		fontFamily: 'Nunito_600SemiBold',
		fontSize: 16,
		lineHeight: 24,
		marginTop: 20
	},

	scheduleTextBlue: {
		color: '#5c8599'
	},

	scheduleTextGreen: {
		color: '#37c77f'
	},

	scheduleTextRed: {
		color: '#ff669d'
	},

	contactButton: {
		alignItems: 'center',
		backgroundColor: '#3cdc8c',
		borderRadius: 20,
		flexDirection: 'row',
		height: 56,
		justifyContent: 'center',
		marginTop: 40
	},

	contactButtonText: {
		color: '#fff',
		fontFamily: 'Nunito_800ExtraBold',
		fontSize: 16,
		marginLeft: 16
	}
})

export default OrphanageDetails