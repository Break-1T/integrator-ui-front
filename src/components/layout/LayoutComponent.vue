<script setup lang="ts">
import { ref } from 'vue';
import SidebarComponent from '../sidebar/SidebarComponent.vue';
import CookieHelper from '@/helpers/CookieHelper';
import { useRouter } from 'vue-router';
import AxiosHelper from '@/helpers/AxiosHelper';

const router = useRouter();

const userLoggedIn = ref(false);

const initUserData = () => {
  let accessToken = CookieHelper.getAccessTokenCookie();
  let refreshToken = CookieHelper.getRefreshTokenCookie();
  if (!accessToken && !refreshToken) {
    router.push({ name: 'login' });
  } else if (accessToken) {
    AxiosHelper.setAxiosAuthorizationToken(accessToken);
    userLoggedIn.value = true;
  }
}

const logOut = () => {
  CookieHelper.removeAccessTokenCookie();
  CookieHelper.removeRefreshTokenCookie();
  AxiosHelper.removeAxiosAuthorizationToken();
  router.push("/login");
}

initUserData();

</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: var(--p-surface-100);
  padding: 0.5rem 1rem;
  box-sizing: border-box;
}

.header img {
  height: 45px;
}

.content {
  flex: 1;
  display: flex;
  overflow: hidden;

  .sidebar {
    min-width: 200px;
    max-width: 15vw;
    overflow-y: auto;
    box-sizing: border-box;
  }

  .main-content {
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;
  }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  background-color: var(--p-surface-100);
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  font-size: 0.9rem;
  border-top: 1px solid var(--p-surface-300);
}
</style>

<template>
  <div v-if="userLoggedIn" class="layout">
    <header class="header">
      <img src="/logo.png" alt="DataBridge logo" />
      <Button @click="logOut" icon="pi pi-sign-out" />
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
  <div v-else>
    Loading ...
  </div>
</template>
