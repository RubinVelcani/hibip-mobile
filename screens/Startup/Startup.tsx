import { useEffect } from 'react'
import { ActivityIndicator, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'

import { useTheme } from '@/theme'
import { Brand } from '@/components/molecules'
import { SafeScreen } from '@/components/template'

import type { ApplicationScreenProps } from '@/types/navigation'

import loadingSplash from '@/assets/loadingSplash.png'

function Startup({ navigation }: ApplicationScreenProps) {
	const { layout, gutters, fonts } = useTheme()

	const { isSuccess, isFetching, isError } = useQuery({
		queryKey: ['startup'],
		queryFn: () => {
			return Promise.resolve(true)
		},
	})

	useEffect(() => {
		navigation.reset({
			index: 0,
			routes: [{ name: 'Onboarding' }],
		})
	}, [isSuccess])

	return (
		<SafeScreen>
			<ImageBackground source={loadingSplash} resizeMode='cover' style={styles.backgroundImage}>
				<View style={[layout.flex_1, layout.col, layout.itemsCenter, layout.justifyCenter]}>
					{/* <Brand /> */}
					{isFetching && <ActivityIndicator size='large' style={[gutters.marginVertical_24]} />}
					{isError && <Text style={[fonts.size_16, fonts.red500]}>Startup error</Text>}
				</View>
			</ImageBackground>
		</SafeScreen>
	)
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default Startup
