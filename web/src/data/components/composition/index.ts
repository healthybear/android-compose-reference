import type { ComponentEntry } from '../../types'

export { formCompositionComponent } from './form-composition'
export { searchBarCompositionComponent } from './search-bar-composition'
export { listWithDialogCompositionComponent } from './list-with-dialog-composition'
export { settingsScreenCompositionComponent } from './settings-screen-composition'
export { onboardingCompositionComponent } from './onboarding-composition'

import { formCompositionComponent } from './form-composition'
import { searchBarCompositionComponent } from './search-bar-composition'
import { listWithDialogCompositionComponent } from './list-with-dialog-composition'
import { settingsScreenCompositionComponent } from './settings-screen-composition'
import { onboardingCompositionComponent } from './onboarding-composition'

export const compositionComponents: ComponentEntry[] = [
  formCompositionComponent,
  searchBarCompositionComponent,
  listWithDialogCompositionComponent,
  settingsScreenCompositionComponent,
  onboardingCompositionComponent,
]
