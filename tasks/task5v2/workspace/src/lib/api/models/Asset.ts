/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Asset = {
    id?: number;
    type?: string;
    serial_number?: string;
    status?: Asset.status;
};
export namespace Asset {
    export enum status {
        AVAILABLE = 'available',
        ASSIGNED = 'assigned',
        MAINTENANCE = 'maintenance',
    }
}

