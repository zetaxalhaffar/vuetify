---
meta:
  title: Masonry
  description: Masonry lays out contents of varying dimensions as blocks of the same width and different height with configurable gaps and responsive breakpoints with drag and drop support.
  keywords: Masonry, vuetify Masonry component, vue Masonry component
features:
  label: 'C: VMasonry'
  github: /components/VMasonry/
  report: true
---

# Masonry

Masonry lays out contents of varying dimensions as blocks of the same width and different height with configurable gaps and responsive breakpoints with drag and drop support.

<PageFeatures />

::: warning

This feature requires [v3.9.3](/getting-started/release-notes/?version=v3.9.3)

:::

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VMasonry } from 'vuetify/labs/VMasonry'

export default createVuetify({
  components: {
    VMasonry,
  },
})
```

## Basic masonry

A simple example of a Masonry. Masonry is a container for one or more items. It can receive any element including <div /> and <img />.

<ExamplesExample file="v-masonry/usage" />

::: tip

Pull down functionality is available as soon as its immediate scrollable parent has scrolled to the top.

:::

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-pull-to-refresh](/api/v-pull-to-refresh/) | Primary Component |

<ApiInline hide-links />
