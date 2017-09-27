/**
 * Recipe View Screen
 *  - The individual recipe screen
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { Icon, Rating } from 'react-native-elements'
// Consts and Libs
import { AppStyles } from '@theme/'

// Components
import { Card, Text } from '@ui/'

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  favourite: {
    position: 'absolute',
    top: -45,
    right: 0
  }
})

/* Component ==================================================================== */
class RecipeCard extends Component {
  static componentName = 'RecipeCard';

  static propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    onPressFavourite: PropTypes.func,
    isFavourite: PropTypes.bool,
    price: PropTypes.string
  }

  static defaultProps = {
    onPress: null,
    onPressFavourite: null,
    isFavourite: null
  }

  render = () => {
    const { title, image, onPress, onPressFavourite, isFavourite, price } = this.props

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Card image={image && { uri: image }}>
          <View style={[AppStyles.paddingBottomSml]}>
            <Text h3>{title}</Text>
            <Text>{price}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 10, alignItems: 'flex-end' }} >
            <Rating
              startingValue={4}
              readonly
              imageSize={20}
            />
            <Text style={{ color: '#777' }}>{'  0 ratings'}</Text>
            </View>

            {!!onPressFavourite &&
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPressFavourite}
                style={[styles.favourite]}
              >
                <Icon
                  type="material-community"
                  raised
                  name={'heart-outline'}
                  color={isFavourite ? '#FFFFFF' : '#fd0a2a'}
                  containerStyle={{
                    backgroundColor: isFavourite ? '#fd0a2a' : '#FFFFFF'
                  }}
                />
              </TouchableOpacity>
            }
          </View>
        </Card>
      </TouchableOpacity>
    )
  }
}

/* Export Component ==================================================================== */
export default RecipeCard
