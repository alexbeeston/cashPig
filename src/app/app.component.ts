import { Component } from '@angular/core';
import { CommonModule, getLocaleFirstDayOfWeek } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InputFieldComponent } from './input-field/input-field.component';
import { ExtraPincipalComponent } from './extra-pincipal/extra-pincipal.component';
import { LoanPaydownComponent } from './loan-paydown/loan-paydown.component';
import { InputType } from './input-type';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    InputFieldComponent,
    ExtraPincipalComponent,
    LoanPaydownComponent
  ]
})

export class AppComponent {
  initialBalance: number = 0;
  monthlyPayment: number = 0;
  interestRate: number = 0;
  startDate!: Date;
  extraPayments: ExtraPincipalComponent[] = [];
  InputTypes = InputType;
  loanPaydownWithoutExtra: LoanPaydownComponent | null = null;
  loanPaydownWithExtra: LoanPaydownComponent | null = null;

  getCurrentDate(): string {
    return new Date().toString();
  }

  stringToNumber(stringLiteral: string): number {
    return Number(stringLiteral);
  }

  stringToDate(stringLiteral: string): Date {
    return new Date(stringLiteral);
  }

  updateLifespans(): void {
    this.loanPaydownWithoutExtra = new LoanPaydownComponent(this.startDate, this.initialBalance, this.monthlyPayment, this.initialBalance, []);
    this.loanPaydownWithExtra = new LoanPaydownComponent(this.startDate, this.initialBalance, this.monthlyPayment, this.initialBalance, this.extraPayments);
  }

  addExtraPayment(): void {
    this.extraPayments.push(new ExtraPincipalComponent());
  }
}