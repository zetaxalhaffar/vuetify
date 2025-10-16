import { createSwapy } from 'swapy'

// Styles
import './VMasonry.sass'

// Composables
import { useDisplay } from '@/composables/display'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed, useTemplateRef, watchEffect } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { CSSProperties, PropType } from 'vue'
import type { DisplayBreakpoint } from '@/composables/display'

export type VMasonrySlots = {
  content: {
    item: any
    index: number
  }
};

export type SwapyAnimation = 'dynamic' | 'spring' | 'none'
export type SwapySwapMode = 'hover' | 'drop'
export type SwapyDragAxis = 'x' | 'y' | 'both'
export type SwapyOptions = {
  animation?: SwapyAnimation
  enabled?: boolean
  swapMode?: SwapySwapMode
  autoScrollOnDrag?: boolean
  dragOnHold?: boolean
  dragAxis?: SwapyDragAxis
}

const defaultSwapyOptions: SwapyOptions = {
  animation: 'dynamic' as SwapyAnimation,
  enabled: true,
  swapMode: 'hover' as SwapySwapMode,
  autoScrollOnDrag: true,
  dragOnHold: false,
  dragAxis: 'both' as SwapyDragAxis,
}

export type ResponsiveColumns = {
  [key in DisplayBreakpoint]?: number
} & {
  default?: number
}

export type ResponsiveGap = {
  [key in DisplayBreakpoint]?: number
} & {
  default?: number
}

export type ResponsiveWidth = {
  [key in DisplayBreakpoint]?: number
} & {
  default?: number
}

export const makeVMasonryProps = propsFactory({
  items: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: [Number, Object] as PropType<number | ResponsiveColumns>,
    default: () => (null),
  },
  gap: {
    type: [Number, Object] as PropType<number | ResponsiveGap>,
    default: () => ({ default: 2 }),
  },
  width: {
    type: [Number, Object] as PropType<number | ResponsiveWidth>,
    default: () => ({ default: null }),
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  style: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
  dragableOptions: {
    type: Object as PropType<SwapyOptions>,
    default: () => ({
      ...defaultSwapyOptions,
    }),
  },
  ...makeTagProps({ tag: 'div' }),
}, 'VMasonry')

// Helper function to get responsive value based on current breakpoint
function getResponsiveValue<T> (
  value: T | ResponsiveColumns,
  display: ReturnType<typeof useDisplay>,
  fallback: T
): T {
  if (typeof value === 'object' && value !== null) {
    const responsiveValue = value as ResponsiveColumns
    const currentBreakpoint = display.name.value

    // Check if there's a value for the current breakpoint
    if (responsiveValue[currentBreakpoint] !== undefined) {
      return responsiveValue[currentBreakpoint] as T
    }

    // Check for default value
    if (responsiveValue.default !== undefined) {
      return responsiveValue.default as T
    }

    // Fallback to the first available value or the fallback
    const availableValues = Object.values(responsiveValue).filter(v => v !== undefined)
    return (availableValues[0] ?? fallback) as T
  }
  return value as T
}

export const VMasonry = genericComponent<VMasonrySlots>()({
  name: 'VMasonry',

  props: makeVMasonryProps(),

  emits: {
    swap: (value: any) => true,
  },
  setup (props, { slots, emit }) {
    const display = useDisplay()
    const ref = useTemplateRef('masonry')

    const responsiveColumns = computed(() =>
      getResponsiveValue(props.columns, display, props.items.length)
    )

    const responsiveGap = computed(() =>
      getResponsiveValue(props.gap, display, 2)
    )

    const responsiveDefaultWidth = computed(() =>
      getResponsiveValue(props.width, display, null)
    )

    const swapy = computed(() => {
      if (!ref.value) return null
      return createSwapy(ref.value! as HTMLElement, {
        ...defaultSwapyOptions,
        ...props.dragableOptions,
      })
    })

    watchEffect(() => {
      if (swapy.value) {
        swapy.value.onSwap((event: any) => {
          const fromIndex = parseInt(event.draggingItem.replace('a-', ''))
          const toIndex = parseInt(event.swappedWithItem.replace('a-', ''))
          emit('swap', {
            fromItem: props.items[fromIndex],
            toItem: props.items[toIndex],
            fromIndex,
            toIndex,
            fromSlot: event.fromSlot,
            toSlot: event.toSlot,
          })
        })
        swapy.value.onSwapStart(event => {
          const currentItem = document.querySelector(`[data-swapy-item="${event.draggingItem}"]`)
          currentItem?.classList.add('masonry__column--dragging')
        })
        swapy.value.onSwapEnd(event => {
          const currentItem = document.querySelectorAll('[data-swapy-item]')
          currentItem.forEach(item => {
            item.classList.remove('masonry__column--dragging')
          })
        })
      }
    })

    useRender(() => {
      const Tag = props.tag
      return (
        <Tag>
          <div
            ref="masonry"
            class="masonry"
            style={[
              {
                '--masonry-columns': responsiveColumns.value,
                '--masonry-column-width': responsiveDefaultWidth.value ? `${responsiveDefaultWidth.value}px` : '100%',
                '--masonry-column-gap': `${responsiveGap.value}px`,
                '--masonry-item-gap': `${responsiveGap.value}px`,
                '--masonry-draggable': props.draggable ? '1' : '0',
              },
              props.style,
            ]}
          >
            { props.items && props.items.map((item: any, index) => {
              const isItemDraggable = item.draggable !== undefined ? item.draggable : props.draggable

              return (
                <div key={ `slot-${index}` } data-swapy-slot={ `a-${index}` } class="masonry__column">
                  <div data-swapy-item={ `a-${index}` }>
                    { isItemDraggable ? (
                      <div key={ `slot-${index}-draggable` }>
                        { slots.content?.({ item, index }) }
                      </div>
                    ) : (
                      <div key={ `slot-${index}-not-draggable` } data-swapy-no-drag>
                        { slots.content?.({ item, index }) }
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </Tag>
      )
    })
  },
})

export type VMasonry = InstanceType<typeof VMasonry>
