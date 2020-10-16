import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface HeaderProps {
	showCancel?: boolean,
	title: string
}

const Header: React.FC<HeaderProps> = ({ title, showCancel = true }) => {
	const { goBack, navigate } = useNavigation()

	return (
		<View style={styles.container}>
			<BorderlessButton onPress={goBack}>
				<Feather name="arrow-left" size={24} color="#15b5d6" />
			</BorderlessButton>

			<Text style={styles.title}>{title}</Text>

			{showCancel ?
				<BorderlessButton onPress={() => navigate('OrphanagesMap')}>
					<Feather name="x" size={24} color="#ff669d" />
				</BorderlessButton>
				: <View />
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#f9fafc',
		borderBottomWidth: 1,
		borderColor: '#dde3f0',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 24,
		paddingTop: 44
	},
	title: {
		color: '#8fa7b3',
		fontFamily: 'Nunito_600SemiBold',
		fontSize: 16
	}
})

export default Header