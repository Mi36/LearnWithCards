import React, {Component} from 'react';
import {View, Text, Animated, StyleSheet, PanResponder} from 'react-native';

class Deck extends Component {
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    //  1- create the panResponder
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        position.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        });
      },
      onPanResponderRelease: (e, gestureState) => {},
    });
    this.state = {panResponder, position}; // using this we can refrence from inside render and component
  }
  renderCards = () => {
    return this.props.data.map(item => {
      return this.props.renderCard(item);
    });
  };

  render() {
    return (
      <Animated.View
        style={this.state.position.getLayout()}
        {...this.state.panResponder.panHandlers}>
        {this.renderCards()}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({});

export default Deck;
