<template>
  <div class="app-wrapper">
    <app-header />
    <results />
  </div>
</template>

<script>
  // Import components
  import AppHeader from './AppHeader.vue';
  import Results from './Results.vue';
  // Import library helpers
  import Creds from '../lib/credentials.js';

  export default {
    name: 'app',
    components: { AppHeader, Results },
    created() {
      Creds.ensureSettingsExist();
    },
  };
</script>

<style>
  body {
    min-height: 100vh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }

  .app-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
</style>
