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

import EventListItem from './components/EventListItem'

const allEventsQuery = gql`
  query {
      allEvents {
          id
          name
          imageUrl
          description
      }
  }
  `
const MOCK_EVENTS = []

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

class EventsPage extends React.Component {
  state = {
    isLoading: true,
    dataSource: []
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
      dataSource: ds.cloneWithRows(MOCK_EVENTS)
    })
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.allEventsQuery.loading && !nextProps.allEventsQuery.error) {
      const {dataSource} = this.state
      this.setState({
        dataSource: dataSource.cloneWithRows(nextProps.allEventsQuery.allEvents),
      })
    }
  }
  _goToEvent = (event) => {
    this.props.navigation.navigate('EventTabs', { event })
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
              <EventListItem
                key={rowData.id}
                event={rowData}
                goToEvent={this._goToEvent}
              />
            }
          />
        </View>
        :
        <View>
          <Text>No events yet!</Text>
        </View>
      )
    }
  }
}

const EventsPageWithData = graphql(allEventsQuery, {name: 'allEventsQuery'})(EventsPage)
export default EventsPageWithData
