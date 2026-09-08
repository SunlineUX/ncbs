import { defineStore } from 'pinia'
export type LayoutMode = 'side' | 'top'
export type DensityMode = 'comfortable' | 'compact'
export type RadiusMode = 'default' | 'round' | 'square'
export type PrimaryColor = 'blue' | 'green' | 'orange' | 'red'

const primaryColors: Record<
  PrimaryColor,
  { base: string; hover: string; active: string; light: string }
> = {
  blue: { base: '#2563eb', hover: '#1d4ed8', active: '#1e40af', light: 'rgba(37, 99, 235, 0.12)' },
  green: { base: '#16a34a', hover: '#15803d', active: '#166534', light: 'rgba(22, 163, 74, 0.12)' },
  orange: {
    base: '#ea580c',
    hover: '#c2410c',
    active: '#9a3412',
    light: 'rgba(234, 88, 12, 0.12)',
  },
  red: { base: '#dc2626', hover: '#b91c1c', active: '#991b1b', light: 'rgba(220, 38, 38, 0.12)' },
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    layoutMode: 'side' as LayoutMode,
    density: 'comfortable' as DensityMode,
    primaryColor: 'blue' as PrimaryColor,
    radiusMode: 'default' as RadiusMode,
    enableTabs: false,
    enableBreadcrumb: true,
  }),
  actions: {
    apply() {
      const root = document.documentElement
      root.dataset.layout = this.layoutMode
      root.dataset.density = this.density
      root.dataset.radius = this.radiusMode
      root.style.setProperty('--density-space', this.density === 'compact' ? '4px' : '8px')
      root.style.setProperty(
        '--radius-sm',
        this.radiusMode === 'round' ? '6px' : this.radiusMode === 'square' ? '0px' : '2px',
      )
      root.style.setProperty(
        '--radius-md',
        this.radiusMode === 'round' ? '10px' : this.radiusMode === 'square' ? '0px' : '4px',
      )
      root.style.setProperty(
        '--radius-lg',
        this.radiusMode === 'round' ? '16px' : this.radiusMode === 'square' ? '0px' : '8px',
      )
      root.style.setProperty(
        '--layout-content-padding',
        this.density === 'compact' ? '10px' : '16px',
      )
      const color = primaryColors[this.primaryColor]
      root.style.setProperty('--color-primary', color.base)
      root.style.setProperty('--color-primary-hover', color.hover)
      root.style.setProperty('--color-primary-active', color.active)
      root.style.setProperty('--color-primary-light', color.light)
    },
    init() {
      this.apply()
    },
    reset() {
      this.$reset()
      this.apply()
    },
  },
  persist: [
    'layoutMode',
    'density',
    'primaryColor',
    'radiusMode',
    'enableTabs',
    'enableBreadcrumb',
  ],
})
