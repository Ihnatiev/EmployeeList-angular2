import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Employee } from '../employee.model';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [EmployeesService]
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  displayedColumns = ['view', 'edit', 'Id', 'Name', 'Active', 'Department', 'delete'];

  isLoading = false;
  employees: Employee[] = [];
  totalEmployees = 0;
  employeesPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [5, 10, 15];

  private employeesSub: Subscription;

  constructor(
    public employeesService: EmployeesService,
  ) {}

ngOnInit() {
  this.employeesService.getEmployees(this.employeesPerPage, this.currentPage);
  this.employeesSub = this.employeesService
  .getEmployeeUpdateListener()
  .subscribe((employeeData: { employees: Employee[]; employeeCount: number }) => {
    this.totalEmployees = employeeData.employeeCount;
    this.employees = employeeData.employees;
  });
}

onChangedPage(pagination: PageEvent) {
  console.log(pagination);
  // this.currentPage = pageData.pageIndex + 1;
  // this.employeesPerPage = pageData.pageSize;
  // this.employeesService.getEmployees(this.employeesPerPage, this.currentPage);
}

onDelete(employeeId: number) {
  this.employeesService.deleteEmployee(employeeId).subscribe(() => {
    this.employeesService.getEmployees(this.employeesPerPage, this.currentPage);
  }, () => {
      this.isLoading = false;
    });
  }

ngOnDestroy() {
  this.employeesSub.unsubscribe();
}
}
