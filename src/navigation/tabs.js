/**
 * Tabs Scenes
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react'
import { Scene } from 'react-native-router-flux'

// Consts and Libs
import { AppConfig } from '@constants/'
import { AppStyles, AppSizes } from '@theme/'

// Components
import { TabIcon } from '@ui/'
import { NavbarMenuButton } from '@containers/ui/NavbarMenuButton/NavbarMenuButtonContainer'

// Scenes
import Placeholder from '@components/general/Placeholder'
import Error from '@components/general/Error'
import StyleGuide from '@containers/StyleGuideView'
import Recipes from '@containers/recipes/Browse/BrowseContainer'
import RecipeView from '@containers/recipes/RecipeView'
import AppointmentView from '@containers/recipes/AppointmentView'

const navbarPropsTabs = {
  ...AppConfig.navbarProps,
  renderLeftButton: () => <NavbarMenuButton />,
  sceneStyle: {
    ...AppConfig.navbarProps.sceneStyle
    // paddingBottom: AppSizes.tabbarHeight
  }
}

/* Routes ==================================================================== */
const scenes = (
    <Scene
      {...navbarPropsTabs}
      key={'recipes'}
      title={'mStrong'}
      icon={props => TabIcon({ ...props, icon: 'search' })}
    >
      <Scene
        {...navbarPropsTabs}
        key={'recipesListing'}
        component={Recipes}
        title={'mStrong'}
        analyticsDesc={'mStrong: Browse Clinics'}
      />
      <Scene
        {...AppConfig.navbarProps}
        key={'recipeView'}
        component={RecipeView}
        getTitle={props => ((props.title) ? props.title : 'View Clinics')}
        analyticsDesc={'RecipeView: View Recipe'}
      />
      <Scene
        {...AppConfig.navbarProps}
        key={'appointmentView'}
        component={AppointmentView}
        getTitle={'Set an appointment'}
        analyticsDesc={'Appointment'}
      />

    </Scene>
)

export default scenes
