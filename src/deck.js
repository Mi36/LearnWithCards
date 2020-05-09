import React, {Component} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderCards = () => {
    console.warn('aaaa');
    return this.props.data.map(item => {
      return this.props.renderCard(item);
    });
  };

  render() {
    return <View>{this.renderCards()}</View>;
  }
}

const styles = StyleSheet.create({});

export default Deck;
