import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InputFieldComponent } from './input-field/input-field.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, InputFieldComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  testProperty: string = "testing";
  title = 'prepaymentCalculator';

  initialBalance: number = 0;
  monthlyPayment: number = 0;
  interestRate: number = 0;

  stringToNumber(stringLiteral: string): number {
    return Number(stringLiteral);
  }

  computePaymentSchedule(): LoanLifespan {
    let currentBalance: number = this.initialBalance;
    const lifespan: LoanLifespan = new LoanLifespan();
    while (currentBalance > 0) {
      const interestComponent: number = currentBalance * this.interestRate / 12;
      const principalComponent: number = Math.min(this.monthlyPayment - interestComponent, currentBalance);

      lifespan.monthsToPay++;
      lifespan.totalInterestPaid += interestComponent;
      currentBalance -= principalComponent;
    }

    return lifespan;
  }

  logLifespan(lifespan: LoanLifespan) {
    let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    console.log("Total interest: " + lifespan.totalInterestPaid);
    console.log("Months to finish: " + lifespan.monthsToPay);
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
