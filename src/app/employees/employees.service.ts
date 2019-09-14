import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Employee } from './employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeesService {

  private employees: Employee[] = [];
  private employeesUpdated = new Subject<{ employees: Employee[]; employeeCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getEmployees(employeesPerPage: number, currentPage: number) {
    const queryParams = '?pagesize=${employeesPerPage}&page=${currentPage}';
    this.http
    .get<{ message: string; employees: any; maxEmployees: number }>(
      'http://localhost:3000/api/employees' + queryParams
    )
    .pipe(
      map(employeeData => {
        return {
          employees: employeeData.employees.map(employee => {
            return {
              empID: employee.empID,
              empName: employee.empName,
              empActive: employee.empActive,
              empDepartment: employee.dpName
            };
          }),
          maxEmployees: employeeData.maxEmployees
        };
      })
    )
    .subscribe(transformedEmployeeData => {
      this.employees = transformedEmployeeData.employees;
      this.employeesUpdated.next({
        employees: [...this.employees],
        employeeCount: transformedEmployeeData.maxEmployees
      });
    });
  }

  getEmployeeUpdateListener() {
    return this.employeesUpdated.asObservable();
  }

  getEmployee(employeeId: number) {
    return this.http.get<{
      empID: number;
      empName: string;
      empActive: boolean;
      empDepartment: string;
    }>('http://localhost:3000/api/employees/' + employeeId);
  }

  addEmployee(empName: string, empActive: string, empDepartment: string) {
    const employeeData = new FormData();
    employeeData.append('empName', empName);
    employeeData.append('empActive', empActive);
    employeeData.append('empDepartment', empDepartment);
    this.http
    .post<{ message: string; employee: Employee }>(
      'http://localhost:3000/api/employees', employeeData
    )
    .subscribe(responseData => {
      this.router.navigate(['/']);
    });
  }

  updateEmployee(empName: string, empActive: boolean, empDepartment: string) {
    // let employeeData: Employee | FormData;
    // if (typeof empDepartment === 'number') {
    // employeeData = new FormData();
    // employeeData.append('empName', empName);
    // employeeData.append('empActive', empActive);
    // employeeData.append('empDepartment', empDepartment);
    // } else {
    //   employeeData = {
    //     empName: empName,
    //     empActive: empActive,
    //     empDepartment: empDepartment
    //   };
    // }
    // this.http
    //   .put('http://localhost:3000/api/employees/' + employeeId, employeeData)
    //   .subscribe(response => {
    //     this.router.navigate(['/']);
    //   });
  }

  deleteEmployee(employeeId: number) {
    return this.http.delete('http://localhost:3000/api/employees/' + employeeId);
  }
}
