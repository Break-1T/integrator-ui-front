import { BaseServiceResult } from './BaseServiceResult'

export class ServiceObjectResult<T> extends BaseServiceResult {
  private _result: T | undefined
  public get Result(): T | undefined {
    return this._result
  }

  fromSuccess(result: T | undefined) {
    this._isSuccess = true
    this._errorMessage = null
    this._result = result
  }

  fromError(errorMessage: string) {
    this._isSuccess = false
    this._errorMessage = errorMessage
  }
}
