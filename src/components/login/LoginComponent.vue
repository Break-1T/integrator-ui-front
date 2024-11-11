<template>
    <div class="auth-container">
      <img src="/logo.png" alt="Databridge Logo" class="logo" />
  
      <div class="auth-form">
        <h2>Login</h2>
        <div class="form-field">
          <label for="username">Username</label>
          <InputText id="username" v-model="username" placeholder="Enter your username" />
        </div>
        <div class="form-field">
          <label for="password">Password</label>
          <Password id="password" v-model="password" :feedback="false" placeholder="Enter your password" toggleMask />
        </div>
        <Button label="Login" class="login-button" @click="handleLogin" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import InputText from 'primevue/inputtext';
  import Password from 'primevue/password';
  import Button from 'primevue/button';
  
  const username = ref('');
  const password = ref('');
  
  const handleLogin = () => {
    // Логика авторизации
    console.log('Username:', username.value);
    console.log('Password:', password.value);
  };
  </script>
  
  <style lang="scss" scoped>
  .auth-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: var(--p-surface-100);
  }
  
  .logo {
    width: 150px;
    margin-bottom: 1rem;
  }
  
  .auth-form {
    width: 300px;
    padding: 2rem;
    background-color: var(--p-surface-300);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  .auth-form h2 {
    margin-bottom: 1.5rem;
    color: var(--p-text-primary);
  }
  
  .form-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    text-align: left;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: var(--p-text-secondary);
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
  }
  
  .login-button {
    width: 100%;
    margin-top: 1rem;
    background-color: var(--p-primary-500);
    color: #fff;
  }
  </style>
  