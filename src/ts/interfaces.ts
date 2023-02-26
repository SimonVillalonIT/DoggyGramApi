import { Request, Response } from "express";
import { NextFunction } from "express";

export interface request extends Request {
  uid: string | number;
}

export interface response extends Response {}

export interface next extends NextFunction {}

export interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
}
