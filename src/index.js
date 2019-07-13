import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  allowJs: true,
  esModuleInterop: true,
})
 
import('monaco-themes/themes/Oceanic Next.json')
  .then(data => {
    monaco.editor.defineTheme('oceanic-next', data);
    monaco.editor.setTheme('oceanic-next')
  })

monaco.editor.create(document.getElementById('editor'), {
  language: 'html',
  theme: 'oceanic-next',
  autoClosingBrackets: true,
  autoClosingQuotes: true,
  autoIndent: true,
  autoSurround: true,
  automaticLayout: true,
  lineNumbersMinChars: 2,
  minimap: {
    enabled: false
  }
});

