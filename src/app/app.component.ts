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

  computePaydown(startDate: Date, initialBalance: number, monthlyPayment: number, interestRate: number, extraPrincipal: ExtraPincipalComponent[], log: boolean = false): LoanPaydown {
    const appliedPayments: AppliedPayment[] = extraPrincipal.map(x => new AppliedPayment(x));
    const paydown: LoanPaydown = new LoanPaydown();
    paydown.endDate = new Date(startDate);
    paydown.totalInterestPaid = 0;
    let balance: number = initialBalance;
    while (balance > 0) {
      if (log) {
        console.log("--- Date is " + paydown.endDate.toDateString())
      }
      const interestComponent: number = balance * interestRate / 12;
      const principalComponent: number = Math.min(monthlyPayment - interestComponent, balance);
      paydown.totalInterestPaid += interestComponent;
      balance -= principalComponent;
      appliedPayments.filter(x => x.paymentDate < paydown.endDate && !x.paymentApplied).forEach(x => {
        balance -= Math.min(balance, x.amount);
        x.paymentApplied = true;
        if (log) {
          console.log("Just applied extra payment for " + x.amount + " paid on " + x.paymentDate.toDateString());
        }
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
    this.loanPaydownWithExtra = this.computePaydown(this.startDate, this.initialBalance, this.monthlyPayment, this.interestRate, this.getListOfMyPrePayments(), true);
  }

  getListOfMyPrePayments(): ExtraPincipalComponent[] {
    return [
      new ExtraPincipalComponent(1000, new Date(2022, 4, 23)),
      new ExtraPincipalComponent(2050, new Date(2022, 5, 29)),
      new ExtraPincipalComponent(1892.56, new Date(2022, 7, 3)),
      new ExtraPincipalComponent(1681.21, new Date(2022, 8, 6)),
      new ExtraPincipalComponent(1161.24, new Date(2022, 9, 5)),
      new ExtraPincipalComponent(3969.06, new Date(2023, 0, 5)),
      new ExtraPincipalComponent(576.15, new Date(2023, 2, 3)),
      new ExtraPincipalComponent(1253.92, new Date(2023, 2, 13)),
      new ExtraPincipalComponent(4485.25, new Date(2023, 4, 8)),
      new ExtraPincipalComponent(800, new Date(2023, 6, 3)),
      new ExtraPincipalComponent(652.07, new Date(2023, 6, 31)),
      new ExtraPincipalComponent(500, new Date(2023, 7, 31)),
      new ExtraPincipalComponent(12308.32, new Date(2023, 11, 29)),
    ];
  }

  addExtraPayment(): void {
    this.extraPayments.push(new ExtraPincipalComponent(10, new Date()));
  }
}

class LoanPaydown {
  totalInterestPaid!: number;
  endDate!: Date;
}

class AppliedPayment extends ExtraPincipalComponent
{
  constructor(extraPrincipalComponent: ExtraPincipalComponent){
    super(10, new Date());
    this.paymentDate = extraPrincipalComponent.paymentDate;
    this.amount = extraPrincipalComponent.amount;
    this.paymentApplied = false;
  }

  paymentApplied: boolean = false;
}