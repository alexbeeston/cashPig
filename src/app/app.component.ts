import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InputFieldComponent } from './input-field/input-field.component';
import { ExtraPincipalComponent } from './extra-pincipal/extra-pincipal.component';

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
  loanWithoutExtraPayment: LoanLifespan = new LoanLifespan();
  loanWithExtraPrincipal: LoanLifespan = new LoanLifespan();
  extraPayments: ExtraPincipalComponent[] = [];

  stringToNumber(stringLiteral: string): number {
    return Number(stringLiteral);
  }

  updateLifespans(): void {
    this.loanWithoutExtraPayment = this.computeLifespan(this.initialBalance, this.monthlyPayment, this.interestRate);
  }

  computeLifespan(initialBalance: number, monthlyPayment: number, interestRate: number): LoanLifespan {
    let currentBalance: number = initialBalance;
    const lifespan: LoanLifespan = new LoanLifespan();
    while (currentBalance > 0) {
      const interestComponent: number = currentBalance * interestRate / 12;
      const principalComponent: number = Math.min(monthlyPayment - interestComponent, currentBalance);

      lifespan.monthsToPay++;
      lifespan.totalInterestPaid += interestComponent;
      currentBalance -= principalComponent;
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
  constructor() {
    this.totalInterestPaid = 0;
    this.monthsToPay = 0;
  }

  totalInterestPaid: number;
  monthsToPay: number;
}