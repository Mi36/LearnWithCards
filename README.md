# Samples

This is an example for animations in react native

# interpolation for rotation

To comeback card to its initial position when we release the card
use onPanresponderRelease function
inside this we have to write our logic.

swipe card left or right, detect the swipe,
this is done also in onPanResponderRelease

# flash problem

it is because changing of normal view to animated view
to solve this make every vie as animated view
the two things are same
difference is the animated view contains additional prop
