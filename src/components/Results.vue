<template>
  <main>
    <iframe
      ref="resultFrame">
    </iframe>
  </main>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'Results',
    computed: {
      ...mapState({
        resourceHTML: (state) => {
          return state.resource.HTML;
        },
      }),
    },
    watch: {
      resourceHTML(html) {
        this.$refs.resultFrame.contentDocument.write(html);
      }
    },
  };
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  iframe {
    flex-grow: 1;
    display: block;
    margin-top: 60px;
    border: none;
    width: 100%;
  }
</style>
