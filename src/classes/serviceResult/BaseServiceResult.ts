export class BaseServiceResult {
  constructor() {
    this._isSuccess = false
    this._errorMessage = null
  }

  protected _isSuccess: boolean
  public get IsSuccess(): boolean {
    return this._isSuccess
  }

  protected _errorMessage: string | null
  public get ErrorMessage(): string | null {
    return this._errorMessage
  }
}
