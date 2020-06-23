<template>
  <div>
    <div class="trigger" @click="openMenu">
      <svg viewBox="0 0 100 80" width="30" height="30">
        <rect width="100" height="20"></rect>
        <rect y="30" width="100" height="20"></rect>
        <rect y="60" width="100" height="20"></rect>
      </svg>
    </div>
    <nav class="navigation" :class="isOpen">
      <div class="trigger" @click="closeMenu">
        <svg viewPort="0 0 30 30" width="30" height="30">
          <line x1="1" y1="29" x2="29" y2="1" stroke="black" stroke-width="6"/>
          <line x1="1" y1="1" x2="29" y2="29" stroke="black" stroke-width="6"/>
        </svg>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'AppMenu',
    data() {
      return {
        menuIsOpen: false,
      };
    },
    computed: {
      isOpen() {
        return this.menuIsOpen ? 'navigation--open' : '';
      },
    },
    methods: {
      openMenu() {
        this.menuIsOpen = true;
      },
      closeMenu() {
        this.menuIsOpen = false;
      }
    },
  };
</script>

<style>
  .navigation {
    position: fixed;
    top: 0;
    bottom: 0;
    left: -500px;
    padding: 30px 10px;
    width: 500px;
    background-color: #EEEEEE;
    transition: left .5s;
  }

  .navigation--open {
    left: 0px;
    box-shadow: -2px 0px 15px black;
  }

  svg {
    fill: #FFFFFF;
  }
</style>
