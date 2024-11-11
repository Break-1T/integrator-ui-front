export enum RecordTransferStatusEnum {
  New = 0,
  Processing,
  Processed,
  Failed,
  Ignored
}

// Объект для текстовых значений, соответствующих числовым значениям enum
export const RecordTransferStatusText: Record<RecordTransferStatusEnum, string> = {
  [RecordTransferStatusEnum.New]: "New",
  [RecordTransferStatusEnum.Processing]: "Processing",
  [RecordTransferStatusEnum.Processed]: "Processed",
  [RecordTransferStatusEnum.Failed]: "Failed",
  [RecordTransferStatusEnum.Ignored]: "Ignored",
};
