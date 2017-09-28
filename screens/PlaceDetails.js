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


export default class PlaceDetails extends React.Component {
  state = {
    isLoading: true,
    dataSource: []
  }
  componentDidMount() {
    Image.getSize(this.props.navigation.state.params.place.banner, (width, height) => {
      
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
      const { title, banner, description } = this.props.navigation.state.params.place;
      return (
        <ScrollView>
          {/* <Text>Event {name} details go here</Text> */}
          <Image
              resizeMode="contain"
              source={{uri: banner}}
              style={{ width: width, height: height }}
            />
            <Text style={ styles.description }>{description}</Text>
        </ScrollView>
      )
    }
    

    
    
  }
}

const styles = StyleSheet.create({
  bannerImage: {
    padding: 12,
  },
  description: {
    fontSize: 20
  }
})