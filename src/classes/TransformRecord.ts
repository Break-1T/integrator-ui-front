import type { TransformRecordStatusEnum } from "@/enums/TransformRecordStatusEnum";

export class TransformRecord {
  public transformRecordId?: number;
  public recordType?: string;
  public entityVersion?: Date;
  public inRecordTransferId?: number;
  public outRecordTransferId?: number;
  public source?: string;
  public sourceId?: string;
  public status?: TransformRecordStatusEnum;
  public statusMessage?: string;
  public target?: string;
  public targetId?: string;
  public recCreated?: Date;
  public recModified?: Date;
}
