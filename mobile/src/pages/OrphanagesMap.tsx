import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import mapMarker from '../images/map-marker.png'
import { RectButton } from 'react-native-gesture-handler'

const OrphanagesMap: React.FC = () => {
	const { navigate } = useNavigation()

	return (
		<View style={styles.container}>
			<MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={
				{ latitude: -28.3304323, longitude: -49.0351485, latitudeDelta: 0.016, longitudeDelta: 0.016 }
			}>
				<Marker icon={mapMarker} calloutAnchor={{ x: 2.7, y: 0.9 }} coordinate={
					{ latitude: -28.3304323, longitude: -49.0351485 }
				}>
					<Callout tooltip={true} onPress={() => navigate('OrphanagesDetails')}>
						<View style={styles.calloutContainer}>
							<Text style={styles.calloutText}>Nome Qualquer</Text>
						</View>
					</Callout>
				</Marker>
			</MapView>

			<View style={styles.footer}>
				<Text style={styles.footerText}>2 orfanatos encontrados</Text>

				<RectButton style={styles.createOrphanageButton} onPress={() => navigate('SelectMapPosition')}>
					<Feather name="plus" size={20} color="#fff" />
				</RectButton>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	map: {
		flex: 1
	},

	calloutContainer: {
		backgroundColor: '#ffffffcc',
		borderRadius: 16,
		height: 46,
		justifyContent: 'center',
		paddingHorizontal: 16,
		width: 160
	},

	calloutText: {
		color: '#0089a5',
		fontFamily: 'Nunito_700Bold',
		fontSize: 14
	},

	footer: {
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 20,
		bottom: 32,
		elevation: 4,
		flexDirection: 'row',
		height: 56,
		justifyContent: 'space-between',
		left: 24,
		paddingLeft: 24,
		position: 'absolute',
		right: 24
	},

	footerText: {
		color: '#8fa7b3',
		fontFamily: 'Nunito_700Bold'
	},

	createOrphanageButton: {
		alignItems: 'center',
		backgroundColor: '#15c3d6',
		borderRadius: 20,
		height: 56,
		justifyContent: 'center',
		width: 56
	}
})

export default OrphanagesMap