import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import kotlin from 'shiki/dist/langs/kotlin.mjs'
import githubDark from 'shiki/dist/themes/github-dark.mjs'
import githubLight from 'shiki/dist/themes/github-light.mjs'

export type CodeTheme = 'github-dark' | 'github-light'

const highlighterPromise = createHighlighterCore({
  engine: createJavaScriptRegexEngine(),
  langs: [kotlin],
  themes: [githubDark, githubLight],
})

/** Reused highlighter limited to the language and themes displayed by the docs. */
export async function highlightKotlin(code: string, theme: CodeTheme) {
  const highlighter = await highlighterPromise
  return highlighter.codeToHtml(code, { lang: 'kotlin', theme })
}
