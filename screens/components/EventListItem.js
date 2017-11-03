import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Animated,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import moment  from 'moment-es6'

export default function EventListItem({ event, goToEvent }) {
  console.log('ELI', event)
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => goToEvent(event)}>
      
      <FontAwesome
        name={event.icon ? event.icon : 'ticket'}
        size={32}
        color='black'
        style={styles.icon}
      />
      <View style={{flex: 1}}>
        <Text style={styles.h2}>{event.name}</Text>
        {/* <Text style={styles.intro}>{event.description}</Text> */}
        {/* {<Text style={styles.p}>{event.eventVenue.title}</Text>} */}
        <Text style={styles.p}>{moment(event.eventDate).format("DD MMM h:mm a")}</Text>
      </View>
      <FontAwesome
        name='chevron-right'
        size={32}
        color='black'
        style={styles.icon}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eff3f3',
    flexDirection: 'row',
    marginHorizontal: 8,
    marginVertical: 4,
    shadowColor: '#2B2B2B',
    shadowOffset: { width: 3, height: 3},
    shadowRadius: 3,
    shadowOpacity: .5,
    elevation: 10
  },
  h2: {
    fontWeight: "700",
    fontSize: 18,
    color: '#2B2B2B',
    margin: 4,
    paddingBottom: 12
  },
  p: {
    fontWeight: "400",
    fontSize: 12,
    color: '#2B2B2B',
    margin: 4,
    paddingBottom: 4
  },
  intro: {
    fontWeight: "300",
    fontSize: 18,
    color: '#2B2B2B',
    margin: 4,
    paddingBottom: 4
  },
  icon: {
    padding: 12,
    alignSelf: 'center'
  }
})
