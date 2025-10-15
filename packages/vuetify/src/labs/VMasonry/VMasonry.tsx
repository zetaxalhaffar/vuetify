import { createSwapy } from 'swapy'

// Styles
import './VMasonry.sass'

// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed, useTemplateRef, watchEffect } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { CSSProperties, PropType } from 'vue'

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

export const makeVMasonryProps = propsFactory({
  items: {
    type: Array,
    default: () => [],
  },
  gap: {
    type: Number,
    default: 2,
  },
  defaultHeight: {
    type: Number,
    default: 200,
  },
  sequential: {
    type: Boolean,
    default: false,
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

export const VMasonry = genericComponent<VMasonrySlots>()({
  name: 'VMasonry',

  props: makeVMasonryProps(),

  emits: {
    swap: (value: any) => true,
  },
  setup (props, { attrs, slots, emit }) {
    const ref = useTemplateRef('masonry')
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
          // eslint-disable-next-line no-console
          console.log(event)
        })
        swapy.value.onSwapEnd(event => {
          // eslint-disable-next-line no-console
          console.log(event)
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
                '--masonry-columns': props.items.length,
                '--masonry-column-width': `${props.defaultHeight}px`,
                '--masonry-column-gap': `${props.gap}px`,
                '--masonry-sequential': props.sequential ? '1' : '0',
                '--masonry-draggable': props.draggable ? '1' : '0',
              },
              props.style,
            ]}
          >
            { props.items && props.items.map((item: any, index) => (
              <div key={ `slot-${index}` } data-swapy-slot={ `a-${index}` }>
                <div data-swapy-item={ `a-${index}` } class="masonry__column">
                  { item.draggable && (
                    <div key={ `slot-${index}-draggable` }>
                      { slots.content?.({ item, index }) }
                    </div>
                  )}
                  { !item.draggable && (
                    <div key={ `slot-${index}-not-draggable` } data-swapy-no-drag={ item.draggable }>
                      { slots.content?.({ item, index }) }
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Tag>
      )
    })
  },
})

export type VMasonry = InstanceType<typeof VMasonry>;
