/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IChatQuery } from "../models/IChatQuery"

import type { CancelablePromise } from "../core/CancelablePromise"
import { OpenAPI } from "../core/OpenAPI"
import { request as __request } from "../core/request"

export class ChatService {
  /**
   * Run Status
   * @param runId
   * @returns boolean Successful Response
   * @throws ApiError
   */
  public static runStatusApiV1ChatRunRunIdStatusGet(runId: string): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/chat/run/{run_id}/status",
      path: {
        run_id: runId,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Run Cancel
   * @param runId
   * @returns boolean Successful Response
   * @throws ApiError
   */
  public static runCancelApiV1ChatRunRunIdCancelGet(runId: string): CancelablePromise<boolean> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/chat/run/{run_id}/cancel",
      path: {
        run_id: runId,
      },
      errors: {
        422: `Validation Error`,
      },
    })
  }

  /**
   * Agent Chat
   * This function handles the chat interaction with an agent. It converts the chat
   * messages to the Langchain format, creates a memory of the conversation, and sets up
   * a stream handler. It then creates an asyncio task to handle the conversation with
   * the agent and returns a streaming response of the conversation.
   *
   * Args:
   * chat (IChatQuery): The chat query containing the messages and other details.
   * jwt (Annotated[dict, Depends(get_jwt)]): The JWT token from the request.
   * meta_agent (AgentExecutor, optional): The MetaAgent instance. Defaults to the one returned by get_
   * meta_agent_with_api_key.
   *
   * Returns:
   * StreamingResponse: The streaming response of the conversation.
   * @param requestBody
   * @returns any Successful Response
   * @throws ApiError
   */
  public static agentChatApiV1ChatAgentPost(requestBody: IChatQuery): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/chat/agent",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    })
  }

  public static async batchAgentChat(requestBodies: IChatQuery[], concurrency: number = 10): Promise<any[]> {
    const results: any[] = [];
    
    for (let i = 0; i < requestBodies.length; i += concurrency) {
      const batch = requestBodies.slice(i, i + concurrency);
      const batchResults = await Promise.all(
        batch.map(async (requestBody) => {
          try {
            return await ChatService.agentChatApiV1ChatAgentPost(requestBody);
          } catch (error) {
            console.error("Erreur lors de l'envoi de la requête :", error);
            return null;
          }
        })
      );
      results.push(...batchResults);
    }
  
    return results;
  }
  
}
