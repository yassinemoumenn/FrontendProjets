export abstract class DumbComponent {
  private readonly subClassConstructor: Function;

  protected constructor() {
    this.subClassConstructor = this.constructor;

    if (this.isEmptyConstructor() || arguments.length !== 0) {
      this.throwError('it should not inject services');
    }
  }

  private isEmptyConstructor(): boolean {
    return this.subClassConstructor.toString().split('(')[1][0] !== ')';
  }

  private throwError(reason: string): void {
    throw new Error(
      `Component "${this.subClassConstructor.name}" is a DumbComponent, ${reason}.`
    );
  }
}

/**
 * The dumb component should only take values from inputs. They should not use services or any other means of getting data.
 *
 * All dumb components should use ChangeDetectionStrategy.OnPush.
 * Import it from angular/core
 * @component({
 * ...
 * changeDetection: ChangeDetectionStrategy.OnPush
 * })
 */
