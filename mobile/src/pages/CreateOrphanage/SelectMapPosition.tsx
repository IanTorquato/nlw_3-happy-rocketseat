import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import MapView, { Marker } from 'react-native-maps'

import mapMarkerImg from '../../images/map-marker.png'

export default function SelectMapPosition() {
	const { navigate } = useNavigation()

	return (
		<View style={styles.container}>
			<MapView style={styles.mapStyle}
				initialRegion={{ latitude: -27.2092052, longitude: -49.6401092, latitudeDelta: 0.008, longitudeDelta: 0.008, }}>

				<Marker icon={mapMarkerImg} coordinate={{ latitude: -27.2092052, longitude: -49.6401092 }} />
			</MapView>

			<RectButton style={styles.nextButton} onPress={() => navigate('OrphanageData')}>
				<Text style={styles.nextButtonText}>Próximo</Text>
			</RectButton>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative'
	},

	mapStyle: {
		height: Dimensions.get('window').height,
		width: Dimensions.get('window').width
	},

	nextButton: {
		alignItems: 'center',
		backgroundColor: '#15c3d6',
		borderRadius: 20,
		bottom: 40,
		height: 56,
		justifyContent: 'center',
		left: 24,
		position: 'absolute',
		right: 24
	},

	nextButtonText: {
		color: '#fff',
		fontFamily: 'Nunito_800ExtraBold',
		fontSize: 16
	}
})