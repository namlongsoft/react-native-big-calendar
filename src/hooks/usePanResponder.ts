import React from 'react'
import { PanResponder } from 'react-native'
import { HorizontalDirection } from '../interfaces'


export function usePanResponder({
  swipeThreshold = 50,
  onSwipeHorizontal,
}: {
  swipeThreshold?: number
  onSwipeHorizontal?: (d: HorizontalDirection) => void
}) {
  const [panHandled, setPanHandled] = React.useState(false)

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        // see https://stackoverflow.com/questions/47568850/touchableopacity-with-parent-panresponder
        onMoveShouldSetPanResponder: (_, { dx, dy }) => {
          return dx > 2 || dx < -2 || dy > 2 || dy < -2
        },
        onPanResponderMove: (_, { dy, dx }) => {
          if (dy < -1 * swipeThreshold || swipeThreshold < dy || panHandled) {
            return
          }
          
          if (dx < -1 * swipeThreshold) {
            onSwipeHorizontal && onSwipeHorizontal('LEFT')
            setPanHandled(true)
            return
          }
          if (dx > swipeThreshold) {
            onSwipeHorizontal && onSwipeHorizontal('RIGHT')
            setPanHandled(true)
            return
          }
        },
        onPanResponderEnd: () => {
          setPanHandled(false)
        },
      }),
    [panHandled, onSwipeHorizontal],
  )

  return panResponder
}
