import router from '@/router';
import { useAuthStore } from '@/stores/AuthStore';
import axios, { AxiosError } from 'axios'
import CookieHelper from '@/helpers/CookieHelper';

const instance = axios.create({
  baseURL: import.meta.env.VITE_INTEGRATOR_API_URL
});

const retryRequestHeader = "RETRY_REQUEST";

const removeAxiosAuthorizationToken = () => {
  delete instance.defaults.headers.common['Authorization'];
}

const setAxiosAuthorizationToken = (token: string) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function handleDefaultError(error: AxiosError) {
  let resMessage: any = null;

  switch(error.code) {
      case AxiosError.ERR_NETWORK: {
          resMessage = "Network error: Please check your connection and try again";
          break;
      }

      default:
          break;
  }

  // if (resMessage) {
  //     EventBus.emit(ToastConstants.Error, resMessage);
  // }
}

const errorInterceptor = async (error: any) => {
  if (!(error instanceof AxiosError)) {
      return;
  }

  const originalRequest = error.config;
  if ((error?.response?.status === 401 || error?.response?.status === 403) && originalRequest && !originalRequest.headers.has(retryRequestHeader)) {
      originalRequest.headers.set(retryRequestHeader, true);

      let authStore = useAuthStore();
      let refreshTokenResult = await authStore.refreshTokenAsync(CookieHelper.getRefreshTokenCookie());

      if (!refreshTokenResult.IsSuccess) {
          router.push({ path: '/login' });

          removeAxiosAuthorizationToken();
          return Promise.reject(error);
      }

      setAxiosAuthorizationToken(CookieHelper.getAccessTokenCookie());
      originalRequest.headers['Authorization'] = `Bearer ${CookieHelper.getAccessTokenCookie()}`;
      return instance.request(originalRequest);
  }

  handleDefaultError(error);

  return Promise.reject(error);
}

instance.interceptors.response.use(response => response, errorInterceptor);

export default { instance, removeAxiosAuthorizationToken, setAxiosAuthorizationToken }
