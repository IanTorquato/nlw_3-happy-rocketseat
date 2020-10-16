import React from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

export default function OrphanageData() {
	return (
		<ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
			<Text style={styles.title}>Dados</Text>

			<Text style={styles.label}>Nome</Text>
			<TextInput style={styles.input} />

			<Text style={styles.label}>Sobre</Text>
			<TextInput style={[styles.input, { height: 110 }]} maxLength={300} multiline />

			<Text style={styles.label}>Whatsapp</Text>
			<TextInput style={styles.input} />

			<Text style={styles.label}>Fotos</Text>
			<TouchableOpacity style={styles.imagesInput} onPress={() => { }}>
				<Feather name="plus" size={24} color="#15B6D6" />
			</TouchableOpacity>

			<Text style={styles.title}>Visitação</Text>

			<Text style={styles.label}>Instruções</Text>
			<TextInput style={[styles.input, { height: 110 }]} multiline />

			<Text style={styles.label}>Horario de visitas</Text>
			<TextInput style={styles.input} />

			<View style={styles.switchContainer}>
				<Text style={styles.label}>Atende final de semana?</Text>

				<Switch thumbColor="#fff" trackColor={{ false: '#ccc', true: '#39CC83' }} />
			</View>

			<RectButton style={styles.nextButton} onPress={() => { }}>
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
		marginBottom: 32
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