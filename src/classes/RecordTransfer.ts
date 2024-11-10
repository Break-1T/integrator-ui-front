import type { RecordTransferStatusEnum } from "@/enums/RecordTransferStatusEnum";

export class RecordTransfer {
  public recordTransferId?: number;
  public responseContentId?: number;
  public requestContentId?: number;
  public recordType?: string;
  public source?: string;
  public sourceId?: string;
  public status?: RecordTransferStatusEnum;
  public statusMessage?: string;
  public target?: string;
  public targetId?: string;
  public recCreated?: Date;
  public recModified?: Date;
}
