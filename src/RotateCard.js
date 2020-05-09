import React, {Component} from 'react';
import {View, Text, Animated, StyleSheet, PanResponder} from 'react-native';

class RotateCard extends Component {
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

  getCardStyle = () => {
    //here we return as one object
    //then it pass to style property
    return {
      ...this.state.position.getLayout(),
      transform: [{rotate: '-45deg'}],
    };
  };

  renderCards = () => {
    return this.props.data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={item.id}
            style={this.getCardStyle()}
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

export default RotateCard;
