export type Status = "idle" | "loading" | "succeeded" | "failed";

export interface EntityState<T> {
  entities: T[];
  entity: T;
  error: null | Error;
  loading: boolean;
}
