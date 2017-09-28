import React from 'react'
import {graphql, gql} from 'react-apollo'
import {
  ActivityIndicator,
  Text,
  Image,
  StyleSheet,
  ListView,
  View,
  TouchableOpacity,
} from 'react-native'

import PlaceListItem from './components/PlaceListItem'

// The following query retrieves all published items only
const allPlacesQuery = gql`
query {
    allPlaces(filter: {published: true}) {
        id
        title
        summary
        address
        town
        postcode
        description
        address
        accentColor
        color
        socialInstagram
        banner
        latitude
        longitude
        createdAt
        headerPhoto {
          imageUrl
          publicId
        }
    }
}
`
const MOCK_PLACES = [
  {id: 23283789271, icon: 'birthday-cake', title: 'Frank\'s birthday party!!', time: 8, location: 'Brooklyn Beer Hall'},
  {id: 23283789272, icon: 'birthday-cake', title: 'Tina\'s birthday party!!', time: 8, location: 'The Village'},
  {id: 89182173873, icon: 'music', title: 'Madame Butterfly', time: 7, location: 'Lincoln Center'},
  {id: 35862618172, icon: 'ticket', title: 'High Line Nature Tour', time: 6, location: 'High Line @ 32nd St.'},
  {id: 49734084298, icon: 'ticket', title: 'N Gallerie Open House', time: 6, location: '3802 W 18th Street'},
  {id: 62098284938, icon: 'glass', title: 'Open Mic Nite', time: 9, location: 'Union Hall'},
  {id: 59818472878, icon: 'child', title: 'Ice Cream Social', time: 4, location: 'Children\'s Museum'},
  {id: 71298398439, icon: 'glass', title: 'Nerd Nite', time: 8, location: 'The Met'}
]

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

class PlacesPage extends React.Component {
  state = {
    isLoading: true,
    dataSource: []
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
      dataSource: ds.cloneWithRows(MOCK_PLACES)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.allPlacesQuery.loading && !nextProps.allPlacesQuery.error) {
      const {dataSource} = this.state
      this.setState({
        dataSource: dataSource.cloneWithRows(nextProps.allPlacesQuery.allPlaces),
      })
    }
  }
  _goToPlace = (place) => {
    this.props.navigation.navigate('PlaceTabs', { place })
  }

  render() {
    if(this.state.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          animating={true}
          size="large"
        />
      </View>
    )
  } else {
    return (
      this.state.dataSource !== null ?
        <View style={{flex: 1, backgroundColor: 'darkgray'}}>
          <ListView
            dataSource={this.state.dataSource}
            removeClippedSubviews={false}
            renderRow={(rowData, sectionID, rowID) =>
              <PlaceListItem
                key={rowData.id}
                place={rowData}
                goToPlace={this._goToPlace}
              />
            }
          />
        </View>
        :
        <View>
          <Text>No places yet!</Text>
        </View>
      )
    }
  }
}

const PlacesPageWithData = graphql(allPlacesQuery, {name: 'allPlacesQuery'})(PlacesPage)
export default PlacesPageWithData
