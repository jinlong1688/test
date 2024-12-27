import { Injectable } from '@nestjs/common';

export interface DatabaseService<T> {
  find(query: any): Promise<T[]>;
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<T | null>;
  delete(id: string): Promise<void>;
}