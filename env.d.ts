/// <reference types="vite/client" />
declare global {
    interface Window {
      __ENV__?: {
        VITE_INTEGRATOR_API_URL?: string;
      };
    }
}
  
export {};