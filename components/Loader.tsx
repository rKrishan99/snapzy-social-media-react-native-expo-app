import { COLORS } from '@/constants/theme'
import { View, Text, ActivityIndicator } from 'react-native'

export function Loader() {
  return (
    <View
    style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
    }}
    >
        <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  )
}