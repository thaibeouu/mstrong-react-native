/**
 * Recipe View Screen
 *  - The individual recipe screen
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react'
import { Firebase, FirebaseRef } from '@constants/'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  Button
} from 'react-native'
import MapView from 'react-native-maps'
import DatePicker from 'react-native-datepicker'

// Consts and Libs
import { AppStyles, AppSizes } from '@theme/'

// Components
import { Card, Spacer, Text } from '@ui/'

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  featuredImage: {
    left: 0,
    right: 0,
    height: AppSizes.screen.height * 0.2,
    resizeMode: 'cover'
  },
  container: {
    // ...StyleSheet.absoluteFillObject,
    // top: 100,
    height: AppSizes.screen.height * 0.35,
    width: AppSizes.screen.width
    // height: 200,
    // width: 200,
    // justifyContent: 'flex-end',
    // alignItems: 'center'
    // flex: 1
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    // flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
})
/* Component ==================================================================== */
var moment = require('moment')
let currentMoment = moment().format('YYYY-MM-DD HH:mm')
let currentLocation = {
  latitude: null,
  longitude: null,
  error: null
}
navigator.geolocation.getCurrentPosition(
  (position) => {
    currentLocation.latitude = position.coords.latitude
    currentLocation.longitude = position.coords.longitude
  },
  (error) => { currentLocation.error = error.message },
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
)
class RecipeView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: currentMoment,
      aptButtonDisabled: false,
      aptButtonText: 'Set Appointment'
    }
  }
  static componentName = 'RecipeView';

  static propTypes = {
    recipe: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      image: PropTypes.string,
      ingredients: PropTypes.arrayOf(PropTypes.string),
      method: PropTypes.arrayOf(PropTypes.string),
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      mdesc: PropTypes.string,
      mtitle: PropTypes.string,
      address: PropTypes.string,
      appointmentDateTime: PropTypes.datetime
    }).isRequired
  }
  setAppointment (date) {
    const UID = Firebase.auth().currentUser.uid
    if (!UID) return false
    let data = {
      recipe: this.props.recipe.id,
      datetime: date
    }
    FirebaseRef.child(`appointments/${UID}`).push(data)
  }

  /**
    * Ingredients
    */
  renderIngredients = (ingredients) => {
    const jsx = []
    let iterator = 1

    ingredients.forEach((item) => {
      jsx.push(
        <View key={`ingredient-${iterator}`} style={[AppStyles.row]}>
          <View><Text> - </Text></View>
          <View style={[AppStyles.paddingLeftSml, AppStyles.flex1]}>
            <Text>{item.toString()}</Text>
          </View>
        </View>
      )
      iterator += 1
    })

    return jsx
  }

  /**
    * Method
    */
  renderMethod = (method) => {
    const jsx = []
    let iterator = 1

    method.forEach((item) => {
      jsx.push(
        <View key={`method-${iterator}`} style={[AppStyles.row]}>
          <View><Text> {iterator}. </Text></View>
          <View style={[AppStyles.paddingBottomSml, AppStyles.paddingLeftSml, AppStyles.flex1]}>
            <Text>{item.toString()}</Text>
          </View>
        </View>
      )
      iterator += 1
    })

    return jsx
  }

  render = () => {
    const { body, ingredients, method, longitude, latitude, mtitle, mdesc, address } = this.props.recipe

    return (
      <ScrollView style={[AppStyles.container]}>
        <View style={styles.container}>
          <MapView
            showMyLocationButton="true"
            showUserLocation="true"
            customMapStyle={AppStyles.gmapStyles.retro}
            style={styles.map}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude
              }}
              title={mtitle}
              description={mdesc}
              pinColor={'#139aff'}
              image={require('../../images/marker.png')}
            />
          </MapView>
        </View>
        <Card>
          <Text>{body}</Text>
          <Text style={{ color: '#777' }}>{address}</Text>
        </Card>

        {ingredients
          ? <Card>
            <Text h2>Categories</Text>
            {this.renderIngredients(ingredients)}
          </Card>
          : null}

        <Card>
          <Text h2>Availability</Text>
          <Text style={{ color: '#777' }}>Right now</Text>
        <Spacer size={20} />
          <DatePicker
            style={{ width: 290 }}
            date={this.state.date}
            mode="datetime"
            placeholder="select date"
            format="YYYY-MM-DD HH:mm"
            minDate={moment().format('YYYY-MM-DD')}
            maxDate={moment().add(7, 'days').format('YYYY-MM-DD')}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              },
              dateText: {
                lineHeight: 10
              },
              placeholderText: {
                lineHeight: 10
              }
            }}
            minuteInterval={30}
            onDateChange={(datetime) => {
              this.setState({ date: datetime })
            }}/>
        <Spacer size={20} />
        <Button
            disabled={this.state.aptButtonDisabled}
            onPress={() => {
              this.setState({ aptButtonDisabled: true })
              this.setState({ aptButtonText: 'Appointment Set' })
              this.setAppointment(this.state.date)
            }}
            title={this.state.aptButtonText}
            color="#139aff" />
        </Card>

        {method
          ? <Card>
            <Text h2>Notes</Text>
            {this.renderMethod(method)}
          </Card>
          : null}

        <Spacer size={40} />
      </ScrollView>
    )
  }
}

/* Export Component ==================================================================== */
export default RecipeView
