import { EventEmitter } from 'events';

export interface ServiceTask<T = unknown> {
  id: string;
  name: string;
  execute: () => Promise<T>;
  timeoutMs?: number;
}

export interface TaskResult<T = unknown> {
  taskId: string;
  success: boolean;
  data?: T;
  error?: Error;
  durationMs: number;
}

export class TaskService extends EventEmitter {
  private registry = new Map<string, ServiceTask>();

  register<T>(task: ServiceTask<T>): void {
    if (this.registry.has(task.id)) {
      throw new Error(`Task with ID "${task.id}" is already registered.`);
    }
    this.registry.set(task.id, task as ServiceTask);
  }

  unregister(taskId: string): boolean {
    return this.registry.delete(taskId);
  }

  async runTask<T>(taskId: string): Promise<TaskResult<T>> {
    const task = this.registry.get(taskId);
    if (!task) {
      throw new Error(`Task "${taskId}" not found in registry.`);
    }

    const startTime = Date.now();
    this.emit('task:start', taskId);

    try {
      const timeout = task.timeoutMs ?? 10000;
      const data = await this.executeWithTimeout(task.execute as () => Promise<T>, timeout);
      const durationMs = Date.now() - startTime;

      const result: TaskResult<T> = { taskId, success: true, data, durationMs };
      this.emit('task:success', result);
      return result;
    } catch (err) {
      const durationMs = Date.now() - startTime;
      const error = err instanceof Error ? err : new Error(String(err));
      const result: TaskResult<T> = { taskId, success: false, error, durationMs };
      this.emit('task:error', result);
      return result;
    }
  }

  private executeWithTimeout<T>(fn: () => Promise<T>, timeoutMs: number): Promise<T> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`Task execution timed out after ${timeoutMs}ms`));
      }, timeoutMs);

      fn()
        .then((res) => {
          clearTimeout(timer);
          resolve(res);
        })
        .catch((err) => {
          clearTimeout(timer);
          reject(err);
        });
    });
  }
}
