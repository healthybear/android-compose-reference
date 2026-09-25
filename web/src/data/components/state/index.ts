import { rememberComponent } from './remember'
import { derivedStateOfComponent } from './derived-state-of'
import { produceStateComponent } from './produce-state'
import { collectAsStateComponent } from './collect-as-state'
import { launchedEffectComponent } from './launched-effect'
import { sideEffectComponent } from './side-effect'
import { disposableEffectComponent } from './disposable-effect'
import { snapshotFlowComponent } from './snapshot-flow'
import { rememberCoroutineScopeComponent } from './remember-coroutine-scope'

export const stateComponents = [
  rememberComponent,
  derivedStateOfComponent,
  produceStateComponent,
  collectAsStateComponent,
  launchedEffectComponent,
  sideEffectComponent,
  disposableEffectComponent,
  snapshotFlowComponent,
  rememberCoroutineScopeComponent,
]
