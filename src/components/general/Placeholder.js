/**
 * Placeholder Scene
 *
    <Placeholder text={"Hello World"} />
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { Firebase, FirebaseRef } from '@constants/'
// Consts and Libs
import { AppStyles } from '@theme/'

// Components
import { Text } from '@ui/'

/* Component ==================================================================== */
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 200,
    width: 200,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})
const Placeholder = ({ text }) => (
  <View style={[AppStyles.container, AppStyles.containerCentered]}>

    <Text>{text}</Text>
  </View>
)

Placeholder.propTypes = { text: PropTypes.string }
Placeholder.defaultProps = { text: 'Coming soon...' }
Placeholder.componentName = 'Placeholder'

/* Export Component ==================================================================== */
export default Placeholder
