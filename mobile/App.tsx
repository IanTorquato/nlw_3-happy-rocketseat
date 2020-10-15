import React from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import { useFonts } from 'expo-font'
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito'

import mapMarker from './src/images/map-marker.png'

export default function App() {
	const [fontsLoaded] = useFonts({ Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold })

	if (!fontsLoaded) { return null }

	return (
		<View style={styles.container}>
			<MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={
				{ latitude: -28.3304323, longitude: -49.0351485, latitudeDelta: 0.016, longitudeDelta: 0.016 }
			}>
				<Marker icon={mapMarker} calloutAnchor={{ x: 2.7, y: 0.8 }} coordinate={
					{ latitude: -28.3304323, longitude: -49.0351485 }
				}>
					<Callout tooltip={true} onPress={() => Alert.alert('Funcionando!', 'Tudo certo aqui.')}>
						<View style={styles.calloutContainer}>
							<Text style={styles.calloutText}>Nome Qualquer</Text>
						</View>
					</Callout>
				</Marker>
			</MapView>

			<View style={styles.footer}>
				<Text style={styles.footerText}>2 orfanatos encontrados</Text>

				<TouchableOpacity style={styles.createOrphanageButton} onPress={() => { }}>
					<Feather name="plus" size={20} color="#fff" />
				</TouchableOpacity>
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