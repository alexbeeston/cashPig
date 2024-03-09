import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InputFieldComponent } from './input-field/input-field.component';
import { ExtraPincipalComponent } from './extra-pincipal/extra-pincipal.component';
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
  ]
})

export class AppComponent {
  initialBalance: number = 0;
  monthlyPayment: number = 0;
  interestRate: number = 0;
  startDate!: Date;
  extraPayments: ExtraPincipalComponent[] = [];
  loanPaydownWithoutExtra: LoanPaydown | undefined = undefined;
  loanPaydownWithExtra: LoanPaydown | undefined = undefined;
  InputTypes = InputType;

  computePaydown(startDate: Date, initialBalance: number, monthlyPayment: number, interestRate: number, extraPrincipal: ExtraPincipalComponent[]): LoanPaydown {
    const appliedPayments: AppliedPayment[] = extraPrincipal.map(x => new AppliedPayment(x));
    const paydown: LoanPaydown = new LoanPaydown();
    paydown.endDate = new Date(startDate);
    paydown.totalInterestPaid = 0;
    let balance: number = initialBalance;
    while (balance > 0) {
      const interestComponent: number = balance * interestRate / 12;
      const principalComponent: number = Math.min(monthlyPayment - interestComponent, balance);
      paydown.totalInterestPaid += interestComponent;
      balance -= principalComponent;
      appliedPayments.filter(x => x.paymentDate < paydown.endDate && !x.paymentApplied).forEach(x => {
        balance -= Math.min(balance, x.amount);
        x.paymentApplied = true;
      });
      paydown.endDate.setMonth(paydown.endDate.getMonth() + 1);
    }

    return paydown;
  }

  getCurrentDate(): string {
    return new Date().toString();
  }

  stringToNumber(stringLiteral: string): number {
    return Number(stringLiteral);
  }

  stringToDate(stringLiteral: string): Date {
    return new Date(stringLiteral);
  }

  updatePaydowns(): void {
    this.loanPaydownWithoutExtra = this.computePaydown(this.startDate, this.initialBalance, this.monthlyPayment, this.interestRate, []);
    this.loanPaydownWithExtra = this.computePaydown(this.startDate, this.initialBalance, this.monthlyPayment, this.interestRate, this.extraPayments);
  }

  addExtraPayment(): void {
    this.extraPayments.push(new ExtraPincipalComponent());
  }
}

class LoanPaydown {
  totalInterestPaid!: number;
  endDate!: Date;
}

class AppliedPayment extends ExtraPincipalComponent
{
  constructor(extraPrincipalComponent: ExtraPincipalComponent){
    super();
    this.paymentDate = extraPrincipalComponent.paymentDate;
    this.amount = extraPrincipalComponent.amount;
    this.paymentApplied = false;
  }

  paymentApplied: boolean = false;
}