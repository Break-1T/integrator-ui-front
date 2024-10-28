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
  background-color: var(--p-surface-300);
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
  width: 100%;
  background-color: var(--p-surface-300);
  text-align: end;
  padding-right: 1rem;
}
</style>

<template>
  <div class="layout">
    <header class="header">
      <img src="/logo.png" alt="DataBridge logo" style="height: 45px;">
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
