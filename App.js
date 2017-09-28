import Expo, { AppLoading, Asset, Font, Constants } from 'expo'
import React from 'react'
import { Platform, StatusBar, View } from 'react-native'

// Really annoying warning, expect it'll go away with v19 or so
console.ignoredYellowBox = ['Warning: checkPropTypes']

import MainNav from './navigation'

import {ApolloProvider,createNetworkInterface,ApolloClient} from 'react-apollo'

export const graphQL_endpoint = 'https://api.graph.cool/simple/v1/cixraxev60e4c0121krsia44h'

const networkInterface = createNetworkInterface({
  uri: graphQL_endpoint,
})

const client = new ApolloClient({ networkInterface })

export default class App extends React.Component {
  state = {
    isLoading: true
  }

  componentWillMount() {
    this._loadAssetsAsync()
  }

  cacheImages = (images) => {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image)
      } else {
        return Asset.fromModule(image).downloadAsync()
      }
    })
  }

  cacheFonts = (fonts) => {
    return fonts.map(font => Font.loadAsync(font))
  }

  async _loadAssetsAsync() {
    const imageAssets = this.cacheImages([
      require('./assets/icons/app.png'),
      require('./assets/icons/loading.png'),
      require('./assets/icons/logo.png')
    ])
    const fontAssets = this.cacheFonts([
      {'opensans-bold': require('./assets/fonts/OpenSans-Semibold.ttf')},
      {'opensans-medium': require('./assets/fonts/OpenSans-Regular.ttf')},
      {'opensans-light': require('./assets/fonts/OpenSans-Light.ttf')}
    ])
    await Promise.all([
      ...imageAssets,
      ...fontAssets,
    ])
    this.setState({ isLoading: false })
  }

  render() {
    if(this.state.isLoading) {
      return <AppLoading />
    }
    return (
      <ApolloProvider client={client}>
      <View style={{flex: 1}}>
        {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
        {Platform.OS === 'android' && <View style={{ height: Constants.statusBarHeight, backgroundColor: 'rgba(0,0,0,0.2)' }} />}
        <MainNav />
      </View>
      </ApolloProvider>
    )
  }
}
