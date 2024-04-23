

import { NavigationProp } from '@react-navigation/native'
import firstOnboardingTab from 'assets/onboardingImages/firstOnboardingTab.svg'
import secondOnboardingTab from 'assets/onboardingImages/secondOnboardingTab.svg'
import PrimaryButton from 'components/UI/PrimaryButton'
import React, { useRef, useState } from 'react'
import { Dimensions, Text, StyleSheet, GestureResponderEvent, View, ScrollView, TouchableOpacity } from 'react-native'

const onboardingTabs = [
  {
    index: 0,
    Image: firstOnboardingTab,
    title: 'Send your package to destination safely',
    subTitle: 'Our partners have spread almost all over Indonesia & have been trusted for a long time',
  },
  {
    index: 1,
    Image: secondOnboardingTab,
    title: 'Various shipping options to suit your needs',
    subTitle: 'There are various variations of shipping that you can choose according to your needs',
  },
]

const dimensions = Dimensions.get('window')

type ItemProps = {
  index: number
  Image: any
  title: string
  subTitle: string
  active: boolean
  onSwipe: (direction: string) => void
}

type RootStackParamList = {
  GetStarted: undefined
}

type OnboardingProps = {
  navigation: NavigationProp<RootStackParamList>
}

const OnboardingTab = ({ index, Image, title, subTitle, active, onSwipe }: ItemProps) => {
  const touchStart = useRef<number | null>(null)
  const touchEnd = useRef<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: GestureResponderEvent) => {
    touchEnd.current = null
    touchStart.current = e.nativeEvent.locationX
  }

  const onTouchMove = (e: GestureResponderEvent) => {
    touchEnd.current = e.nativeEvent.locationX
  }

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return
    const distance = touchStart.current - touchEnd.current
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe || isRightSwipe) onSwipe(isLeftSwipe ? 'left' : 'right')
  }

  return (
    <View style={[styles.item, active && styles.activeItem]}>
      <View style={styles.imageContainer} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <View style={styles.image}>
          <Image width={dimensions.width - 40} />
        </View>
        {/* <Image source={imgSrc} style={styles.image} /> */}
      </View>
      <Text style={styles.textTitle}>{title}</Text>
      <Text style={styles.textSubtitle}>{subTitle}</Text>
    </View>
  )
}

const Onboarding = ({ navigation }: OnboardingProps) => {
  const [activeTab, setActiveTab] = useState(0)

  const onSwipe = (direction: string) => {
    if (direction === 'right') {
      setActiveTab(0)
    } else if (direction === 'left') {
      setActiveTab(1)
    }
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab(0)}>
            <View style={[styles.navButton, activeTab === 0 && styles.activeNavButton]}></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab(1)}>
            <View style={[styles.navButton, activeTab === 1 && styles.activeNavButton]}></View>
          </TouchableOpacity>
        </View>
        <View style={styles.itemContainer}>
          <OnboardingTab
            index={onboardingTabs[0].index}
            Image={onboardingTabs[0].Image}
            title={onboardingTabs[0].title}
            subTitle={onboardingTabs[0].subTitle}
            active={activeTab === onboardingTabs[0].index}
            onSwipe={onSwipe}
          />
          <OnboardingTab
            index={onboardingTabs[1].index}
            Image={onboardingTabs[1].Image}
            title={onboardingTabs[1].title}
            subTitle={onboardingTabs[1].subTitle}
            active={activeTab === onboardingTabs[1].index}
            onSwipe={onSwipe}
          />
        </View>
        <PrimaryButton style={{ button: styles.primaryButtonExtraStyles }} onClick={() => navigation.navigate('GetStarted')} label='Get started' />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // width: '100%',
    // height: dimensions.height,
    // height: '100%',
    // flex: 1,
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
  },
  navContainer: {
    width: '100%',
    flex: 1,
    marginTop: '7.5%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  navItem: {
    padding: 5,
  },
  navButton: {
    height: 5,
    width: 37,
    borderRadius: 9,
    backgroundColor: '#F3FFF0',
  },
  activeNavButton: {
    backgroundColor: '#0B4D43',
  },
  itemContainer: {
    // width: '88.6%',
    // marginHorizontal: 'auto',
    // height: '100%',
    // position: 'relative',
  },
  item: {
    opacity: 0,
    // position: 'absolute',
    display: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 8,
  },
  activeItem: {
    opacity: 1,
    display: 'flex',
    flex: 0,
    flexShrink: 1
    // marginHorizontal: 23 
  },
  textTitle: {
    textAlign: 'center',
    color: '#111E2D', // colors.darkBlue,
    fontWeight: '500',
    fontSize: 23,
    lineHeight: 37,
    maxWidth: 320,
    marginTop: '5%',
  },
  textSubtitle: {
    textAlign: 'center',
    color: '#111E2D', // colors.darkBlue,
    fontSize: 14,
    lineHeight: 23,
    maxWidth: 320,
    marginTop: '1.4%',
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    // height: '100%',
    maxHeight: 382,
    marginVertical: 8,
    paddingTop: 42,
    backgroundColor: '#F3FFF0', // colors.washedGray,
    borderRadius: 27,
  },
  image: {
    // width: 305,
    // marginHorizontal: 23,
  },
  primaryButtonExtraStyles: {
    // position: 'relative',
    // bottom: 50,
    width: '88.6%',
  },
})

export default Onboarding
