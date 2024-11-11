import { WorkerSettings } from "./WorkerSetrtings";

export class CreateIntegrationRequest {
    public integrationName: string = '';
    public imageUrl: string = '';
    public memoryRequest: string = '';
    public memoryLimit: string = '';
    public port: number = 8080;
    public workerSettings: WorkerSettings = new WorkerSettings();
}