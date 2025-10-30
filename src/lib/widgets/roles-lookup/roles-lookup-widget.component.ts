import { Component, OnInit, inject, runInInjectionContext, effect } from '@angular/core';
import { RequestCriteria, RequestCriteriaFactory } from '@cartesianui/core';
import { SelectableControlComponent } from '@cartesianui/common';
import { AuthorizationSandbox } from '../../authorization.sandbox';
import { Role } from '../../models';
import { FORM_IMPORTS } from '../../authorization.imports';

@Component({
  selector: 'roles-lookup',
  exportAs: 'roles-lookup',
  template: `
    <div class="row">
      <div class="card mt-2">
        <div class="card-header">
          <strong>Attach Roles</strong>
        </div>
        <div class="card-body">
          <div class="form-group">
            <selectable-control [options]="items()" optionField="name" [multi]="true" [(value)]="value" placeholder="Select roles..." required></selectable-control>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [...FORM_IMPORTS, SelectableControlComponent],
  standalone: true
})
export class RolesLookupWidgetComponent extends SelectableControlComponent<Role> implements OnInit {
  protected sb = inject(AuthorizationSandbox);

  protected criteriaFactory = inject(RequestCriteriaFactory);

  criteria: RequestCriteria;

  ngOnInit(): void {
    this.initCriteria().limit(100000);
    this.list();

    this.subs.add(
      this.sb.rolesData$.subscribe((roles) => {
        this.items.set(roles ?? []);
      })
    );

    // runInInjectionContext(this.injector, () => {
    //   effect(() => {
    //     console.log('🔄 Criteria updated →', this.criteria?.queryString?.());
    //     // this.list();
    //     // this.appendSearchCriteriaToUrl();
    //   });
    // });

    // 🔄 Emmit value change
    runInInjectionContext(this.injector, () => {
      effect(() => {
        const current = this.value();
        this.valueChange.emit(current);
        this.onChange(current);
      });
    });
  }

  initCriteria(): RequestCriteria {
    return (this.criteria = this.criteriaFactory.create());
  }

  list(): void {
    this.sb.fetchRoles(this.criteria.httpParams());
  }

  override equals(a: Role, b: Role) {
    return a.id === b.id;
  }

  override getOptionLabel(role: Role) {
    return `${role.name} (${role.displayName})`;
  }
}
