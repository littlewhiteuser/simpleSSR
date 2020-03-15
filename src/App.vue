<template>
  <div id="app">
    <router-link to="/">foo</router-link>
    <router-link to="/bar">bar</router-link>
    <blog-post>
      <template v-slot:header>
        <h1>About Me</h1>
      </template>
      <template v-slot:default="slot">
        <p>{{slot.text}}</p>
        <!-- <p>Here's some page content, which will be included in vm.$slots.default, because it's not inside a named slot.</p> -->
      </template>
      <template v-slot:footer>
        <p>this is footer</p>
      </template>
    </blog-post>

    <router-view></router-view>

    <div>
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "blog-post": {
      render (h) {
        var header = this.$slots.header
        var body = this.$scopedSlots.default({
          text: 'hi'
        })
        var footer = this.$slots.footer
        console.log(header, 'vnode')
        return h('div', [
          h('header', header),
          h('main', body),
          h('footer', footer)
        ])
      }
    }
  }
};
</script>
