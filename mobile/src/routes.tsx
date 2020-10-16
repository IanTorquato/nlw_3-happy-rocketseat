import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

import OrphanagesMap from './pages/OrphanagesMap'
import OrphanagesDetails from './pages/OrphanagesDetails'
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition'
import OrphanageData from './pages/CreateOrphanage/OrphanageData'
import Header from './components/Header'

const Routes: React.FC = () => {
	return (
		<NavigationContainer>
			<Navigator screenOptions={{ cardStyle: { backgroundColor: '#f2f3f5' } }}			>
				<Screen name="OrphanagesMap" component={OrphanagesMap} options={{ headerShown: false }} />
				<Screen name="OrphanagesDetails" component={OrphanagesDetails}
					options={{ header: () => <Header title="Orfanato" showCancel={false} /> }} />
				<Screen name="SelectMapPosition" component={SelectMapPosition}
					options={{ header: () => <Header title="Selecione no mapa" /> }} />
				<Screen name="OrphanageData" component={OrphanageData}
					options={{ header: () => <Header title="Informe os dados" /> }} />
			</Navigator>
		</NavigationContainer>
	)
}

export default Routes