// ===============================
// 主题注册表
// 新增主题时在这里注册，并在 styles/themes 中添加对应样式文件
// ===============================

export const themeDefinitions = [
  { value: 'light', labelKey: 'theme.mode.light' },
  { value: 'dark', labelKey: 'theme.mode.dark' },
  { value: 'darkblue', labelKey: 'theme.mode.darkblue' },
] as const

export type ThemeName = (typeof themeDefinitions)[number]['value']

export const ThemeNames = themeDefinitions.map(({ value }) => value) as ThemeName[]
