/**
 * Recipe Reducer
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

// Set initial state
export const initialState = {
  meals: [],
  recipes: [],
  favourites: []
}

export default function recipeReducer (state = initialState, action) {
  switch (action.type) {
    case 'FAVOURITES_REPLACE': {
      return {
        ...state,
        favourites: action.data || []
      }
    }
    case 'MEALS_REPLACE': {
      return {
        ...state,
        meals: action.data
      }
    }
    case 'RECIPES_REPLACE': {
      let recipes = []

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        recipes = action.data.map(item => ({
          id: item.id,
          title: item.title,
          body: item.body,
          category: item.category,
          image: item.image,
          author: item.author,
          ingredients: item.ingredients,
          method: item.method,
          latitude: item.map.latitude,
          longitude: item.map.longitude,
          mdesc: item.map.mdescription,
          mtitle: item.map.mtitle,
          address: item.address,
          price: item.price
        }))
      }

      return {
        ...state,
        recipes
      }
    }
    default:
      return state
  }
}
