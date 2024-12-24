<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <div onclick="window.open('/', '_self')">
      <img id="header-logo" src="/image/logo_1x1.png" alt="" />
      <p>SmoothCloud</p>
    </div>
    <div>
      <nav>
        <RouterLink class="link" to="/#features">Features</RouterLink>
        <RouterLink class="link" to="/#faq">FAQ</RouterLink>
        <RouterLink class="link" to="/documentation">Documentation</RouterLink>
        <RouterLink class="link" to="/download">Download</RouterLink>
        <RouterLink class="link highlighted" to="/documentation/getting-started"
          >Getting Started</RouterLink
        >
      </nav>
      <div>
        <img id="current-language-icon" src="/image/icon/american.png" alt="" />
        <div id="language-select"></div>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #15192f;
}

header > div {
  display: flex;
  align-items: center;
  cursor: pointer;
}

header > div > p {
  margin-left: 10px;
  font-size: 24pt;
  font-weight: bold;
}

#header-logo {
  margin-left: 150px;
  width: 95px;
  height: 95px;
}

header nav .link {
  margin: 0 10px;
  padding: 5px 10px;
  color: #eeeeee;
  font-size: 13pt;
  text-decoration: none;
  transition: 0.2s color ease-in-out;
}

header nav .link:hover {
  color: #bbbbbb;
}

header nav .highlighted {
  padding: 8px 16px;
  background-color: #2d5bdb;
  border-radius: 100px;
  cursor: pointer;
  transition: 0.2s background-color ease-in-out;
}

header nav .highlighted:hover {
  color: #eeeeee;
  background-color: #2447a5;
}

header #current-language-icon {
  margin: 0 130px 0 20px;
  width: 50px;
}
</style>
