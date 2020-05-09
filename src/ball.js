import React, {Component} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

class ball extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  UNSAFE_componentWillMount() {
    this.position = new Animated.ValueXY(0, 0); //1- it is the current position
    Animated.spring(this.position, {
      toValue: {x: 200, y: 500}, //where we want to move//we tell spring object to move from (0,0)-->(200,500)
    }).start();
    //start function is to tell start
    //<Animated.View> is the view that moving
    //all thing we want to move nested inside
    //this.position.getLayout() is the connection between them
    // value XY changing because of the below line ie Animated.spring
  }
  render() {
    return (
      <Animated.View style={this.position.getLayout()}>
        <View style={styles.ball} />
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 3,
    backgroundColor: 'green',
  },
});
export default ball;
