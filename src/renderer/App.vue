<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'MyTime',
  }
</script>

<style>
  /* CSS */
* {
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
}
html {
    padding: 0px;
    margin: 0px;
}
body {
    background: #2d363e;
    color: #EEE;
    margin: 0px;
    padding: 10px;
    font-size: 12px;
}
.text-center {
    text-align: center;
}
.input-form {
    padding: 10px;
    width: 100%;
    margin-top: 10px;
    /* opacity: ; */
    border: 0px;
    box-shadow: 0px 0px 5px #000;
    outline: none !important;
    border-radius: 3px;
}
button.default {
    padding: 5px 15px;
    margin-top: 10px;
    cursor: pointer;
}
</style>
