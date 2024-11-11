export enum TransformRecordStatusEnum {
  AwaitingConfirmation = 1,
  NotConfirmed = 2,
  Confirmed = 3,
  Ignored = 4,
  AwaitingTransformation = 5,
  UnexpectedError = 6,
  SendError = 7,
  TransformError = 8,
}

export const TransformRecordStatusText: Record<TransformRecordStatusEnum, string> = {
  [TransformRecordStatusEnum.AwaitingConfirmation]: "Awaiting Confirmation",
  [TransformRecordStatusEnum.NotConfirmed]: "Not Confirmed",
  [TransformRecordStatusEnum.Confirmed]: "Confirmed",
  [TransformRecordStatusEnum.Ignored]: "Ignored",
  [TransformRecordStatusEnum.AwaitingTransformation]: "Awaiting Transformation",
  [TransformRecordStatusEnum.UnexpectedError]: "Unexpected Error",
  [TransformRecordStatusEnum.SendError]: "Send Error",
  [TransformRecordStatusEnum.TransformError]: "Transform Error",
};
