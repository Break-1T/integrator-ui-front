import { BaseServiceResult } from './BaseServiceResult'

export class ServiceResult extends BaseServiceResult {
  fromSuccess() {
    this._isSuccess = true
    this._errorMessage = null
  }

  fromError(errorMessage: string) {
    this._isSuccess = false
    this._errorMessage = errorMessage
  }
}
