export abstract class ErrorType {
  abstract readonly status: number;
  abstract readonly message: string;

  public static [Symbol.hasInstance](instance: unknown): instance is ErrorType {
    if (instance === null || (typeof instance !== 'object')) {
      return false;
    }

    const status: unknown = (instance as any).status;
    const message: unknown = (instance as any).message;

    if (typeof message !== 'string' && !(message instanceof String)) {
      return false;
    }

    return typeof status === 'number' || status instanceof Number;
  }
}
