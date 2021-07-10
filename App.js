import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
//import Ball from './src/ball';
//import Deck from './src/deck';
//import AnimateOnlyOne from './src/AnimateOnlyOne';
import BringNextCard from './src/BringNextCard';
import MakeStack from './src/MakeStack';
//import RotateCard from './src/RotateCard';
import {Button, Card} from 'react-native-elements';

const DATA = [
  {
    id: 1,
    text: 'Card #1',
    uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
  },
  {
    id: 2,
    text: 'Card #2',
    uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
  },
  {
    id: 3,
    text: 'Card #3',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg',
  },
  {
    id: 4,
    text: 'Card #4',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg',
  },
  {
    id: 5,
    text: 'Card #5',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg',
  },
  {
    id: 6,
    text: 'Card #6',
    uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
  },
  {
    id: 7,
    text: 'Card #7',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg',
  },
  {
    id: 8,
    text: 'Card #8',
    uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg',
  },
];

class App extends Component {
  renderCard(item) {
    return (
      <Card title={item.text} image={{uri: item.uri}} key={item.id}>
        <Text>I can customise this</Text>
        <Button title="View Now" backgroundColor="#03A9F4" />
      </Card>
    );
  }

  renderNoMoreCards() {
    return (
      <Card title="No more Item">
        <Text>No more data</Text>
      </Card>
    );
  }
  render() {
    return (
      <View style={styles.main}>
        <MakeStack
          data={DATA}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'grey',
  },

  box: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
    borderRadius: 50,
  },
});

export default App;
