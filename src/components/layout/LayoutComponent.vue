<script setup lang="ts">
import SidebarComponent from '../sidebar/SidebarComponent.vue';
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;

  width: 100vw !important;
  height: 100vh !important;
  overflow: hidden;
}

.header {
  align-self: center;
  width: 100%;
  background-color: var(--p-surface-100);
}

.content {
  flex: 1 0 auto;
  display: flex;

  .sidebar {
    flex: 0;
    min-width: 200px;
  }

  .main-content {
    flex: 1 0 auto;
  }
}

.footer {
  flex: 0;
  width: 100%;
  height: 100%;
  background-color: var(--p-surface-100);
  text-align: end;
  padding-right: 1rem;
}
</style>

<template>
  <div class="layout">
    <header class="header">
      <img src="/logo.png" alt="DataBridge logo" style="height: 45px; padding: 4px;">
    </header>
    <main class="content">
      <nav class="sidebar">
        <SidebarComponent />
      </nav>
      <aside class="main-content">
        <router-view></router-view>
      </aside>
    </main>
    <footer class="footer">© DataBridge 2024</footer>
  </div>
</template>
