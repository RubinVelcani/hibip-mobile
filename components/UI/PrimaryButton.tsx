import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'

type Props = {
  style?: {
    button?: ViewStyle
    label?: TextStyle
  }
  onClick: () => void
  label: string
  disabled?: boolean
}

const PrimaryButton = ({ style, onClick, label, disabled }: Props) => {
  const buttonStyles = [disabled ? styles.disabledCta : styles.cta, style && style.button && style.button]
  const labelStyles = [styles.ctaLabel, style && style.label && style.label]

  return (
    <Pressable style={buttonStyles} onPress={() => onClick()}>
      <Text style={labelStyles}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  cta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5.7%',
    paddingVertical: 14,
    backgroundColor: '#0B4D43', // colors.primaryButtonGreen,
    borderRadius: 9,
    opacity: 1
  },
  ctaLabel: {
    fontWeight: '500',
    color: '#FFFFFF', // colors.trueWhite,
  },
  disabledCta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5.7%',
    paddingVertical: 14,
    backgroundColor: '#0B4D43', // colors.primaryButtonGreen,
    borderRadius: 9,
    opacity: 0.5
  }
})

export default PrimaryButton
