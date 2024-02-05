import { Component, computed, Input, Signal, signal, WritableSignal } from '@angular/core';
import { ExtraPincipalComponent } from '../extra-pincipal/extra-pincipal.component';
import { first } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-loan-paydown',
  standalone: true,
  imports: [],
  templateUrl: './loan-paydown.component.html',
  styleUrl: './loan-paydown.component.scss'
})

export class LoanPaydownComponent {
  constructor(startDate: Date, balance: number, monthlyPayment: number, interestRate: number, extraPrincipal: ExtraPincipalComponent[]) {
    this.totalInterestPaid = 0;
    this.endDate = new Date(startDate);
    while (balance > 0) {
      const interestComponent: number = balance * interestRate / 12;
      const principalComponent: number = Math.min(monthlyPayment - interestComponent, balance);
      this.totalInterestPaid += interestComponent;
      balance -= principalComponent;
      this.endDate.setMonth(this.endDate.getMonth() + 1);
    }

    this.formatedInterestPaid = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(this.totalInterestPaid);
  }
  
  totalInterestPaid: number;
  endDate: Date;
  formatedInterestPaid: string;
}