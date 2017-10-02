import React from 'react'
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native'

export default class EventDetails extends React.Component {
  state = {
    isLoading: true,
    dataSource: []
  }

  componentDidMount() {
    Image.getSize(this.props.navigation.state.params.event.imageUrl, (width, height) => {
      
            const screenWidth = Dimensions.get('window').width
      
            const scaleFactor = width / screenWidth
            const imageHeight = height / scaleFactor
      
            this.setState({width: screenWidth, height: imageHeight})
          })
      
    this.setState({
      isLoading: false,
      // dataSource: ds.cloneWithRows(MOCK_EVENTS)
    })
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
      console.log(this.props.navigation.state.params.event)
      const {width, height} = this.state
      const { name, imageUrl, description, eventVenue, eventDate, contactName, contactEmail, cost } = this.props.navigation.state.params.event;
      return (
        <ScrollView style={ styles.container }>
          {/* <Text>Event {name} details go here</Text> */}
          <Image
              resizeMode="contain"
              source={{uri: imageUrl}}
              style={{ width: width, height: height }}
            />
            <Text style= { styles.headline }>{name}</Text>
            <Text style={ styles.description }>{description}</Text>
            <Text style= { styles.headline }>Where?</Text>
            <Text style={ styles.venueDetailTitle }>{eventVenue.title}</Text>
            <Text style={ styles.venueDetailAddress }>{eventVenue.address}</Text>
            <Text style={ styles.headline }>When?</Text>
            <Text style={ styles.venueDetailTitle }>{eventDate}</Text>

            <Text style={ styles.headline }>Who to contact?</Text>
            <Text style={ styles.venueDetailTitle }>{contactName}</Text>
            <Text style={ styles.venueDetailAddress }>{contactEmail}</Text>
            <Text style={ styles.headline }>Cost</Text>
            <Text style={ styles.venueDetailTitle }>{cost}</Text>
            
        </ScrollView>
      )
    }
    

    
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  bannerImage: {
    padding: 12,
  },
  headline: {
      fontSize: 24,
      color: '#ff0000',
      alignItems: 'center',
      padding: 20,
  },
  venueDetailTitle: {
      fontSize: 18,
      color: '#000000',
      alignItems: 'center',
      paddingLeft: 20
  },
  venueDetailAddress: {
      fontSize: 14,
      color: '#000',
      alignItems: 'center',
      paddingLeft: 20
  },
  description: {
    fontSize: 18,
    backgroundColor: '#fff',
    padding: 20
  }
})