import type { RecordTransferStatusEnum } from "@/enums/RecordTransferStatusEnum";

export class RecordTransferFilters {
  public recordTransferIds?: number[];
  public statuses?: RecordTransferStatusEnum[];
  public pageNumber: number = 1;
  public pageSize: number = 10;
  public sortBy: string = "RecCreated";
  public sortDesc: boolean = true;
  public sourceList?: string[];
  public targetList?: string[];
  public typeList?: string[];
}
