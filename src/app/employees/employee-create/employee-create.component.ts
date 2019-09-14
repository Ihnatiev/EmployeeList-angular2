import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { EmployeesService } from '../employees.service';
import { Employee } from '../employee.model';
import { Department } from '../department.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  departments: Department[] = [
    { dpID: 1, dpName: 'HR' },
    { dpID: 2, dpName: 'Tech' },
    { dpID: 3, dpName: 'Finance' }
  ];

  enteredName = '';
  enteredDepartment = '';
  employee: Employee;
  isLoading = false;
  form: FormGroup;
  private mode = 'create';
  private employeeId: number;
  private authStatusSub: Subscription;

  constructor(
    public employeesService: EmployeesService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // this.authStatusSub = this.authService
    //   .getAuthStatusListener()
    //   .subscribe(authStatus => {
    //     this.isLoading = false;
    //   });
    // this.form = new FormGroup({
    //   empName: new FormControl(null, {
    //     validators: [Validators.required, Validators.minLength(3)]
    //   }),
    //   empDepartment: new FormControl(null, { validators: [Validators.required] })
    // });
    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has('employeeId')) {
    //     this.mode = 'edit';
    //     this.employeeId = paramMap.get('employeeId');
    //     this.isLoading = true;
    //     this.employeesService.getEmployee(this.employeeId).subscribe(employeeData => {
    //       this.isLoading = false;
    //       this.employee = {
    //         empName: employeeData.empName,
    //         empActive: employeeData.empActive,
    //         empDepartment: employeeData.empDepartment
    //       };
    //       this.form.setValue({
    //         empName: this.employee.empName,
    //         empActive: this.employee.empActive,
    //         empDepartment: this.employee.empDepartment
    //       });
    //     });
    //   } else {
    //     this.mode = 'create';
    //     this.employeeId = null;
    //   }
    // });
  }


  onSaveEmployee() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.employeesService.addEmployee(
        this.form.value.empName,
        this.form.value.cempActive,
        this.form.value.empDepartment
      );
    } else {
      this.employeesService.updateEmployee(
        this.form.value.empName,
        this.form.value.cempActive,
        this.form.value.empDepartment
      );
    }
    this.form.reset();
  }

}
