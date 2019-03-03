export interface IBus {
  publishAsync<T>(message: T): Promise<void>;
}
