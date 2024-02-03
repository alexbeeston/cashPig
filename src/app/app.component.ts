import { Component } from '@angular/core';
import { CommonModule, getLocaleFirstDayOfWeek } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InputFieldComponent } from './input-field/input-field.component';
import { ExtraPincipalComponent } from './extra-pincipal/extra-pincipal.component';
import { InputType } from './input-type';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    InputFieldComponent,
    ExtraPincipalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  initialBalance: number = 0;
  monthlyPayment: number = 0;
  interestRate: number = 0;
  startDate!: Date;
  loanWithoutExtraPayment: LoanLifespan = new LoanLifespan();
  loanWithExtraPrincipal: LoanLifespan = new LoanLifespan();
  extraPayments: ExtraPincipalComponent[] = [];
  InputTypes = InputType;

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
    this.loanWithoutExtraPayment = this.computeLifespan(this.initialBalance, this.monthlyPayment, this.interestRate, []);
    this.loanWithExtraPrincipal = this.computeLifespan(this.initialBalance, this.monthlyPayment, this.interestRate, this.extraPayments);
  }

  computeLifespan(initialBalance: number, monthlyPayment: number, interestRate: number, extraPrincipal: ExtraPincipalComponent[]): LoanLifespan {
    const lifespan: LoanLifespan = new LoanLifespan();
    lifespan.startDate = this.startDate;
    lifespan.endDate = this.startDate;
    lifespan.totalInterestPaid = 0;

    let currentBalance: number = initialBalance;
    while (currentBalance > 0) {
      // Make regular monthly payment first
      const interestComponent: number = currentBalance * interestRate / 12;
      const principalComponent: number = Math.min(monthlyPayment - interestComponent, currentBalance);
      lifespan.totalInterestPaid += interestComponent;
      currentBalance -= principalComponent;

      // apply any principal-only payments
      if (currentBalance > 0) {
        const currentRegularPaymentDate = lifespan.endDate;
        let nextRegularPaymentDate = new Date(currentRegularPaymentDate)
        nextRegularPaymentDate.setMonth(nextRegularPaymentDate.getMonth() + 1);

        extraPrincipal.filter(x => currentRegularPaymentDate < x.paymentDate && x.paymentDate <= nextRegularPaymentDate).forEach(x => {
          console.log('found payment ' + x.paymentDate + ' for ' + x.amount);
          currentBalance -= Math.min(currentBalance, x.amount);
        });

        lifespan.endDate = nextRegularPaymentDate;
      }
    }

    return lifespan;
  }

  currencyFormatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  formatNumMonthsAsString(totalMonths: number): string {
    const numYears = Math.floor(totalMonths / 12);
    const numMonths = totalMonths % 12;
    return `${numYears} years, ${numMonths} months`;
  }

  addExtraPayment(): void {
    this.extraPayments.push(new ExtraPincipalComponent());
  }
}

class LoanLifespan {
  startDate!: Date;
  endDate!: Date;
  totalInterestPaid!: number;

  getMonthsToPay(): number {
    var diff = (this.endDate.getTime() - this.startDate.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7 * 4);
    return Math.abs(Math.round(diff));
  }
}