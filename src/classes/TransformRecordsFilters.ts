import type { TransformRecordStatusEnum } from "@/enums/TransformRecordStatusEnum";

export class TransformRecordsFilters {
  public transformRecordIds?: number[];
  public statuses?: TransformRecordStatusEnum[];
  public pageNumber: number = 1;
  public pageSize: number = 10;
  public sortBy: string = "RecCreated";
  public sortDesc: boolean = true;
  public sourceList?: string[];
  public targetList?: string[];
  public typeList?: string[];
}
