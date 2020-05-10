import React, {Component} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  PanResponder,
  Dimensions,
} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;

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
      onPanResponderRelease: (e, gestureState) => {
        this.resetPosition();
      },
    });
    this.state = {panResponder, position}; // using this we can refrence from inside render and component
  }

  resetPosition = () => {
    Animated.spring(this.state.position, {
      toValue: {x: 0, y: 0},
    }).start();
  };

  getCardStyle = () => {
    const {position} = this.state;
    //this contains position at any instance
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    //here we return as one object
    //then it pass to style property
    return {
      ...position.getLayout(),
      transform: [{rotate: rotate}],
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
