import React from 'react'
import { View } from 'react-native'
import styles from '../assets/ts/styles'
import {LinearGradient} from 'expo-linear-gradient'

const NeuMorph = ({ children , size , style}) => {
    return (
        <View style={styles.topShadow}>

            <View style={styles.bottomShadow}>

                <LinearGradient 
                colors={['#313437','#111316']}
                start={{x:0.92 , y:0}}
                end={{x:0, y:0}} 

                style={[
                    styles.inner,
                    {width: size || 40 , height: size || 40 , borderRadius: size /2 || 40 / 2 },
                    style

                ]}
                >
                    {children}
                </LinearGradient>

            </View>
            
        </View>
    )
}

export default NeuMorph
