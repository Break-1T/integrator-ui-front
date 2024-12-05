import { defineStore } from 'pinia'
import AxiosHelper from '@/helpers/AxiosHelper'
import { AxiosError } from 'axios'
import { ServiceObjectResult } from '@/classes/serviceResult/ServiceObjectResult'
import { TokenResponse } from '@/classes/TokenResponse'

export const useAuthStore = defineStore('authStore', () => {
  async function getAccessTokenAsync(userName: string, password: string): Promise<ServiceObjectResult<TokenResponse>> {
    const serviceResult = new ServiceObjectResult<TokenResponse>()

    try {
      const response = await AxiosHelper.instance.post(`auth/get-access-token`, {
        userName: userName,
        password: password
      });

      if (response.status !== 200) {
        serviceResult.fromError(`Invalid login or password. Details: ${response.data}`);
        return serviceResult;
      }

      serviceResult.fromSuccess(new TokenResponse(response.data.access_token, response.data.refresh_token));
    } catch (ex) {
      let errorMessage = ex instanceof AxiosError
        ? `Invalid login or password. Status code: ${ex.status}`
        : `Could not login, please try again later`;

      serviceResult.fromError(errorMessage);
    }

    return serviceResult
  }

  async function refreshTokenAsync(refreshToken: string): Promise<ServiceObjectResult<TokenResponse>> {
    const serviceResult = new ServiceObjectResult<TokenResponse>()

    try {
      const response = await AxiosHelper.instance.post(`auth/refresh-token?refreshToken=${refreshToken}`);

      if (response.status !== 200) {
        serviceResult.fromError(`Invalid refresh token. Details: ${response.data}`);
        return serviceResult;
      }

      serviceResult.fromSuccess(new TokenResponse(response.data.access_token, response.data.refresh_token));
    } catch (ex) {
      let errorMessage = ex instanceof AxiosError
        ? `Invalid refresh token. Status code: ${ex.status}`
        : `Could not refresh current session, please try again later`;

      serviceResult.fromError(errorMessage);
    }

    return serviceResult
  }

  return {
    getAccessTokenAsync,
    refreshTokenAsync
  }
})
