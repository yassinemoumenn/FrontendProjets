import { Directive, OnDestroy } from '@angular/core';
import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({})
export abstract class SmartComponent implements OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();

  private readonly subClassNgOnDestroy: Function;

  constructor() {
    this.subClassNgOnDestroy = this.ngOnDestroy;
    this.ngOnDestroy = () => {
      this.subClassNgOnDestroy();
      this.unsunscribe();
    };
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy() {}

  protected untilComponentDestroy(): MonoTypeOperatorFunction<any> {
    return takeUntil(this.unsubscribe$);
  }

  private unsunscribe() {
    if (this.unsubscribe$.isStopped) return;

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

/**
 * The main responsibility of a smart component is getting data from an external source.
 * In most cases, it is done with the help of a service injected into the component.
 *
 * Example of use
 *
 * @Component({...})
 * export class UserListComponent extends SmartComponent implements ngOnInit {
 * users: Array<User>;
 *
 * constructor(private readonly userService: UserService) {
 * super();
 * }
 *
 * ngOnInit() {
 *     this.userService
 *     .selectAll()
 *     .pipe(this.untilComponentDestroy())
 *     .subscribe((users) => {this.users = users;
 *       })
 *   }
 * }
 */
