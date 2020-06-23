<template>
  <form
    class="form"
    @submit.prevent="submitForm">
    <input
      v-model="inputValue"
      type="text"
      class="input"
      :placeholder="placeholder" />
    <input
      type="submit"
      class="button"
      :value="buttonText" />
  </form>
</template>

<script>
  export default {
    name: 'HeaderForm',
    props: [
      'buttonText',
      'placeholder',
    ],
    data() {
      return {
        inputValue: '',
      };
    },
    methods: {
      /**
       * Submits the form and passes the submission up to the parent
       */
      submitForm() {
        const formValue = this.inputValue;
        this.$emit('formSubmit', formValue);
      },
    },
  };
</script>

<style>
  .button {
    -webkit-appearance: none;
    border-radius: 3px;
    border-width: 0px;
    background-color: #C5E0B8;
    color: #333333;
    cursor: pointer;
    transition: color 0.3s;
  }

  .button:hover {
    background-color: #277A00;
    color: #FFFFFF;
  }

  .input {
    border-width: 0px;
  }
</style>
