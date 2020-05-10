import React, {Component} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  PanResponder,
  Dimensions,
  UIManager,
  LayoutAnimation,
} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
const SWIPE_OUT_DURATION = 250; //in milli seconds

class MakeStack extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
  };

  //this compares incoming props and new props and made changes if required
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({index: 0});
    }
  }

  componentDidUpdate() {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    LayoutAnimation.spring();
  }
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
        if (gestureState.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      },
    });
    this.state = {panResponder, position, index: 0}; // using this we can refrence from inside render and component
  }

  forceSwipe(direction) {
    //here first argument is the current position and it is continuosly changing while we dragging
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: {
        x: x,
        y: 0,
      },
      duration: SWIPE_OUT_DURATION,
    }).start(() => {
      this.onSwipeComplete(direction);
    });
  }

  onSwipeComplete(direction) {
    const {onSwipeLeft, onSwipeRight, data} = this.props;
    const item = data[this.state.index];
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({x: 0, y: 0}); // reset the position before we attaching next card
    this.setState({index: this.state.index + 1});
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
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    return this.props.data
      .map((item, i) => {
        if (i < this.state.index) {
          return null;
        }
        if (i === this.state.index) {
          return (
            <Animated.View
              key={item.id}
              style={[this.getCardStyle(), styles.cardStyle]}
              {...this.state.panResponder.panHandlers}>
              {this.props.renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={item.id}
            // card placed one below another with little difference
            style={[styles.cardStyle, {top: 10 * (i - this.state.index)}]}>
            {this.props.renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };

  render() {
    return <View>{this.renderCards()}</View>;
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    // right: 0,
    // left: 0,
  },
});
// if we are not putting width here it card size reduced, and takes only width that contain text
//we can also put right:0 and left:0 but it may lead to conflict later in this example

export default MakeStack;
