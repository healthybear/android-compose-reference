import { draggableComponent } from './modifier-draggable'
import { swipeableComponent } from './modifier-swipeable'
import { transformableComponent } from './modifier-transformable'
import { detectTapGesturesComponent } from './detect-tap-gestures'
import { detectDragGesturesComponent } from './detect-drag-gestures'

export const gesturesComponents = [
  draggableComponent,
  swipeableComponent,
  transformableComponent,
  detectTapGesturesComponent,
  detectDragGesturesComponent,
]
