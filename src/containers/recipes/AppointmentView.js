/**
 * Recipe View Screen
 *  - The individual recipe screen
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Firebase, FirebaseRef } from '@constants/'
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  ListView
} from 'react-native'
import MapView from 'react-native-maps'

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
class AppointmentView extends Component {
  static componentName = 'AppointmentView';

  constructor () {
    super()

    this.state = {
      isRefreshing: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }
  listenForTasks (tasksRef) {
    // listen for changes to the tasks reference, when it updates we'll get a
    // dataSnapshot from firebase
    tasksRef.on('value', (dataSnapshot) => {
      // transform the children to an array
      var tasks = []
      dataSnapshot.forEach((child) => {
        tasks.push({
          name: child.val().name,
          _key: child.key
        })
      })

      // Update the state with the new tasks
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tasks)
      })
    })
  }
  getApps () {
    const UID = Firebase.auth().currentUser.uid
    const ref = FirebaseRef.child(`appointments/${UID}`)
    var apps = []
    ref.once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        apps.push({
          date: childSnapshot.val().datetime,
          recipe: childSnapshot.val().recipe
        })
      })
    })
    return apps
  }
  _renderItem (task) {
    // a method for building each list item
    const onTaskCompletion = () => {
      // removes the item from the list
      this.tasksRef.child(task._key).remove()
    }
    return (
      <ListItem task={task} onTaskCompletion={onTaskCompletion} />
    )
  }
  render = () => {
    let data = this.state.dataSource.cloneWithRows(this.getApps())
    return (
<View style={[AppStyles.container]}>
                <ListView
          dataSource={data}
          renderRow={app => <Card><Text>{app.date}</Text></Card>
          }
                 />
      </View>
    )
  }
}

/* Export Component ==================================================================== */
export default AppointmentView
