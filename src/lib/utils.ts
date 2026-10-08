import { createCn } from 'cn/config'

// Teach the class merger about the custom theme scales in src/styles/app.css;
// otherwise e.g. cn('text-title', 'text-primary') drops the font size.
export const cn = createCn({
  extend: {
    classGroups: {
      'font-size': [{ text: ['title', 'display', 'heading', 'md', '2xs'] }],
      shadow: [{ shadow: ['header', 'card', 'panel', 'tile', 'sheet-header', 'practice-card'] }],
    },
  },
})
