import { Router } from "express";

export interface RESTController{
    router(): Router
}