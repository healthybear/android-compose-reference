import { rememberComponent } from './remember'
import { derivedStateOfComponent } from './derived-state-of'
import { produceStateComponent } from './produce-state'
import { collectAsStateComponent } from './collect-as-state'
import { launchedEffectComponent } from './launched-effect'
import { sideEffectComponent } from './side-effect'
import { disposableEffectComponent } from './disposable-effect'

export const stateComponents = [
  rememberComponent,
  derivedStateOfComponent,
  produceStateComponent,
  collectAsStateComponent,
  launchedEffectComponent,
  sideEffectComponent,
  disposableEffectComponent,
]
