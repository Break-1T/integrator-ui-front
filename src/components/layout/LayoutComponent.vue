<script setup lang="ts">
import SidebarComponent from '../sidebar/SidebarComponent.vue';
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;

  width: 100vw !important;
  height: 100vh !important;
}

.header {
  align-self: center;
  width: 100%;
  background-color: #DFDDD0;
}

.content {
  flex: 1 0 auto;
  display: flex;
  gap: 0.5rem;

  .sidebar {
    min-width: 200px;
  }

  .main-content {
    flex: 1 0 auto;
  }
}

.footer {
  align-self: center;
  width: 100%;
  background-color: #DFDDD0;
}
</style>

<template>
  <div class="layout">
    <header class="header">
      <img src="/logo.png" alt="DataBridge logo" style="height: 50px;">
    </header>
    <main class="content">
      <nav class="sidebar">
        <SidebarComponent />
      </nav>
      <aside class="main-content">
        <router-view></router-view>
      </aside>
    </main>
    <footer class="footer">footer</footer>
  </div>
</template>
