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

function runSpring(clock, value, velocity, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 7,
    mass: 1,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.translateX = new Value(0);
    const dragX = new Value(0);
    const state = new Value(-1);
    const dragVX = new Value(0);
    // -1 means state in un determined
    // since we imported from Animated above we can use directly

    this.onGestureEvent = Animated.event([
      {
        nativeEvent: {
          // importent pont here here is translationX
          translationX: dragX,
          velocityX: dragVX,

          // not above carefully
          state: state, // it will say what is the current state
        },
      },
    ]);

    const clock = new Clock();
    const transX = new Value();
    this.translateX = cond(
      eq(state, State.ACTIVE), // active state aano ennu parishodikkum
      [
        stopClock(clock),
        set(transX, dragX), // set the value of dragX to other
        transX, // return this value then
        //if state active this block will run
        //when state is active we want to calculate new panValue
      ],
      [
        //no active then this
        // set(transX, 0),
        //  transX,
        //if inactive this block will run
        // here set transX, check for a condition, if transX is defined or not
        //if yes run the function, otherwise return 0
        // in runSpring function ist argument is clock
        // 2nd is transx
        //3rd is velocity, this we will define on onGestureEvent
        // 4th is the destination point
        set(
          transX,
          cond(defined(transX), runSpring(clock, transX, dragVX, 0), 0),
        ),
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
