import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const {
  set,
  cond,
  eq,
  spring,
  startClock,
  stopClock,
  clockRunning,
  defined,
  Value,
  Clock,
  event,
} = Animated;

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.translateX = new Value(0);
    const dragX = new Value(0);
    const state = new Value(-1); // -1 means state in undetermined
    // since we imported from Animated above we can use directly

    this.onGestureEvent = Animated.event([
      {
        nativeEvent: {
          // importent pont here here is translation X
          translationX: dragX,
          state: state,
        },
      },
    ]);
    const transX = new Value();
    this.translateX = cond(
      eq(state, State.ACTIVE),
      [
        set(transX, dragX), // set the value of dragX to other
        transX, // return this value then
        //if state active this block will run
        //when state is active we want to calculate new panValue
      ],
      [
        set(transX, 0),
        transX,
        //if inactive this block will run
      ],
    );
    //above
    //i- condition
    //ii-if true this will run
    //iii-otherwise 3 will run
    //condition we want to check is this state is active
  }

  //when the circle is dragged the curren state become active
  //once box released the oldstate become active
  //current state becomes end

  render() {
    return (
      <View style={styles.main}>
        <PanGestureHandler
          onGestureEvent={this.onGestureEvent}
          onHandlerStateChange={this.onGestureEvent}>
          <Animated.View
            style={[
              styles.box,
              {
                transform: [{translateX: this.translateX}],
                // transform is used for styyling
              },
            ]}></Animated.View>
        </PanGestureHandler>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  box: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
    borderRadius: 50,
  },
});

export default App;
