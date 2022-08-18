import { 
    View,
    StatusBar,
 } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomStatusBar = (props) => {
    const{
    backgroundColor,
    barStyle ='dark-content',
    showHideTransition ="slide",
    hidden=false,
}=props

    const insets = useSafeAreaInsets();
  return (

    <View style={{ height: insets.top, backgroundColor }}>
    <StatusBar
      animated={true}
      backgroundColor={backgroundColor}
      barStyle={barStyle}
      showHideTransition={showHideTransition}
      hidden={hidden}
    />
  </View>
  )
}

export default CustomStatusBar