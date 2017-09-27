/**
 * Recipe Listing Screen
 *  - Shows a list of receipes
 *
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ListView,
  RefreshControl
} from 'react-native'
import { SearchBar } from 'react-native-elements'

import { Card, Spacer, Text } from '@ui/'

// Consts and Libs
import { AppColors, AppStyles } from '@theme/'
import { ErrorMessages } from '@constants/'

// Containers
import RecipeCard from '@containers/recipes/Card/CardContainer'

// Components
import Error from '@components/general/Error'

/* Component ==================================================================== */
class RecipeListing extends Component {
  static componentName = 'RecipeListing';

  static propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
    reFetch: PropTypes.func
  }

  static defaultProps = {
    reFetch: null
  }

  constructor () {
    super()

    this.state = {
      isRefreshing: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentWillReceiveProps (props) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(props.recipes),
      isRefreshing: false
    })
  }

  /**
    * Refetch Data (Pull to Refresh)
    */
  reFetch = () => {
    if (this.props.reFetch) {
      this.setState({ isRefreshing: true })

      this.props.reFetch()
        .then(() => {
          this.setState({ isRefreshing: false })
        })
    }
  }

  doSearching (txt) {
    if (txt !== '') {
      let newRecipes = this.props.recipes.filter(rp => (rp.title.toLowerCase().indexOf(txt.toLowerCase()) !== -1) || rp.ingredients.join('|').toLowerCase().indexOf(txt.toLowerCase()) !== -1)
      let dataSource = this.state.dataSource.cloneWithRows(newRecipes)
      this.setState({dataSource: dataSource})
    } else {
      let dataSource = this.state.dataSource.cloneWithRows(this.props.recipes)
      this.setState({dataSource: dataSource})
    }
    // this.setState({recipes: newRecipes})
  }
  render = () => {
    let { recipes } = this.props
    let { isRefreshing, dataSource } = this.state

    if (!isRefreshing && (!recipes || recipes.length < 1)) {
      return <Error text={ErrorMessages.recipe404} />
    }

    return (
      <View style={[AppStyles.container]}>
        <SearchBar
          lightTheme
          placeholder='Type Here...'
          onChangeText={(txt) => this.doSearching(txt)}/>
        <ListView
          initialListSize={5}
          renderRow={recipe => <RecipeCard recipe={recipe} />}
          dataSource={dataSource}
          automaticallyAdjustContentInsets={false}
          refreshControl={
            this.props.reFetch
              ? <RefreshControl
                refreshing={isRefreshing}
                onRefresh={this.reFetch}
                tintColor={AppColors.brand.primary}
              />
              : null
          }
        />
        <Spacer size={20} />
      </View>
    )
  }
}

/* Export Component ==================================================================== */
export default RecipeListing
