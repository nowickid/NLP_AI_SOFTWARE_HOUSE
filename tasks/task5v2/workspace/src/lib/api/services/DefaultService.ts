/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Asset } from '../models/Asset';
import type { Assignment } from '../models/Assignment';
import type { Employee } from '../models/Employee';
import type { NewEmployee } from '../models/NewEmployee';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Get all employees
     * @returns Employee A list of employees
     * @throws ApiError
     */
    public static getEmployees(): CancelablePromise<Array<Employee>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/employees',
        });
    }
    /**
     * Register a new employee
     * @param requestBody
     * @returns Employee Employee created
     * @throws ApiError
     */
    public static postEmployees(
        requestBody: NewEmployee,
    ): CancelablePromise<Employee> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/employees',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all assets
     * @returns Asset A list of assets
     * @throws ApiError
     */
    public static getAssets(): CancelablePromise<Array<Asset>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/assets',
        });
    }
    /**
     * Get all assignments
     * @returns Assignment A list of assignments
     * @throws ApiError
     */
    public static getAssignments(): CancelablePromise<Array<Assignment>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/assignments',
        });
    }
}
