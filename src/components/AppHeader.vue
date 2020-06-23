<template>
  <header class="header">
    <app-menu/>
    <h1>Title Here</h1>
    <div class="right-side">
      <!-- The form for entering the URL to audit -->
      <header-form
        v-if="APIKey"
        placeholder="URL to Audit"
        button-text="Start Audit"
        @formSubmit="startAudit" />
      <!-- The form for entering an API key to use -->
      <header-form
        v-else
        placeholder="WebTest API Key"
        button-text="Save API Key"
        @formSubmit="saveAPIKey" />
    </div>
  </header>
</template>

<script>
  // Import components
  import HeaderForm from './HeaderForm';
  import AppMenu from './Menu';
  // Import library helpers
  import Creds from '../lib/credentials.js';
  import FetchSources from '../lib/FetchSources.js';

  export default {
    name: 'AppHeader',
    components: { HeaderForm, AppMenu },
    data() {
      return {
        APIKey: false,
      };
    },
    mounted() {
      this.APIKey = Creds.getAPIKey();
    },
    methods: {
      /**
       * Save the API key to use when running audits
       *
       * @param {String} APIKey: the API key
       */
      saveAPIKey(APIKey) {
        Creds.setAPIKey(APIKey);
        this.APIKey = APIKey;
      },
      /**
       * Starts an audit for the URL entered, will save the results
       * to the Vuex store
       *
       * @param {String} URL: the URL of the page to audit
       */
      startAudit(URL) {
        FetchSources.fetchSources(URL);
      },
    },
  };
</script>

<style>
  .header {
    padding: 20px 10px;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    background-color: #333;
    color: #FFF;
  }

  .right-side {
    text-align: right;
  }
</style>
