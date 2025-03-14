/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IGetResponseBase_ExecutionResult_ } from "../models/IGetResponseBase_ExecutionResult_"

import type { CancelablePromise } from "../core/CancelablePromise"
import { OpenAPI } from "../core/OpenAPI"
import { request as __request } from "../core/request"

export class SqlService {
  private static sanitizeSqlStatement = (statement: string): string | null => {
    if (!statement) return null;
    const cleaned = statement.trim();
    const forbiddenKeywords = ["DROP", "DELETE", "TRUNCATE", "ALTER"];
    if (forbiddenKeywords.some((keyword) => cleaned.toUpperCase().includes(keyword))) {
      console.error("Unsafe SQL query detected:", cleaned);
      return null;
    }

    return cleaned;
  };

  /**
   * Execute Sql
   * Executes an SQL query on the database and returns the result.
   * @param statement
   * @returns IGetResponseBase_ExecutionResult_ Successful Response
   * @throws ApiError
   */
  public static executeSqlApiV1SqlExecuteGet(statement: string): CancelablePromise<IGetResponseBase_ExecutionResult_> {
    const safeStatement = this.sanitizeSqlStatement(statement);
    if (!safeStatement) throw new Error("Invalid or unsafe SQL query");
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/sql/execute",
      query: {
        statement: statement,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }
}
