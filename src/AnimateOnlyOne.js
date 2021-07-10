import React, {Component} from 'react';
import {View, Text, Animated, StyleSheet, PanResponder} from 'react-native';

class AnimateOnlyOne extends Component {
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
    return this.props.data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={item.id}
            style={this.state.position.getLayout()}
            {...this.state.panResponder.panHandlers}>
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }
      return this.props.renderCard(item);
    });
  };

  render() {
    return <View>{this.renderCards()}</View>;
  }
}

const styles = StyleSheet.create({});

export default AnimateOnlyOne;
