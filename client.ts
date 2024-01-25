import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const GetTasksFilterDTO = z
  .object({
    status: z.enum(["OPEN", "IN_PROGRESS", "DONE"]),
    search: z.string(),
  })
  .partial()
  .passthrough();
const ListAllTasksDTO = z.array(
  z
    .object({
      id: z.string().uuid(),
      title: z.string(),
      description: z.string().max(30),
      status: z
        .enum(["OPEN", "IN_PROGRESS", "DONE"])
        .optional()
        .default("OPEN"),
    })
    .passthrough()
);
const CreateTaskDTO = z
  .object({ title: z.string(), description: z.string().max(30) })
  .passthrough();
const GetTasksDTO = z
  .object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string().max(30),
    status: z.enum(["OPEN", "IN_PROGRESS", "DONE"]).optional().default("OPEN"),
  })
  .passthrough();
const UpdateTaskStatusDTO = z
  .object({ status: z.enum(["OPEN", "IN_PROGRESS", "DONE"]).default("OPEN") })
  .partial()
  .required();
const CredentialsDTO = z
  .object({
    username: z.string().min(4).max(12),
    password: z.string().min(6).max(20),
  })
  .passthrough();
const AccessTokenDTO = z.object({ accessToken: z.string() }).passthrough();

export const schemas = {
  GetTasksFilterDTO,
  ListAllTasksDTO,
  CreateTaskDTO,
  GetTasksDTO,
  UpdateTaskStatusDTO,
  CredentialsDTO,
  AccessTokenDTO,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/tasks",
    alias: "getAllTasks",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: GetTasksFilterDTO,
      },
    ],
    response: ListAllTasksDTO,
  },
  {
    method: "post",
    path: "/tasks",
    alias: "createTask",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateTaskDTO,
      },
    ],
    response: GetTasksDTO,
  },
  {
    method: "get",
    path: "/tasks/:id",
    alias: "getTaskById",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: GetTasksDTO,
  },
  {
    method: "delete",
    path: "/tasks/:id",
    alias: "deleteTask",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "patch",
    path: "/tasks/:id/status",
    alias: "updateTaskStatus",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateTaskStatusDTO,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: GetTasksDTO,
  },
  {
    method: "post",
    path: "/user/signin",
    alias: "signinUser",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CredentialsDTO,
      },
    ],
    response: z.object({ accessToken: z.string() }).passthrough(),
    errors: [
      {
        status: 401,
        description: `Please check your login credentials`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/user/signup",
    alias: "signupUser",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CredentialsDTO,
      },
    ],
    response: z.object({ accessToken: z.string() }).passthrough(),
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options,);
}
