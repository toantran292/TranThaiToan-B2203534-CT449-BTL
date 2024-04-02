import { Express, RequestHandler } from "express"
export type RouteHanlder = Map<keyof Express, Map<string, RequestHandler[]>>
