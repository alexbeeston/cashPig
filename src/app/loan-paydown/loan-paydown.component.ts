import { Component } from '@angular/core';
import { ExtraPincipalComponent } from '../extra-pincipal/extra-pincipal.component';

@Component({
  selector: 'app-loan-paydown',
  standalone: true,
  imports: [],
  templateUrl: './loan-paydown.component.html',
  styleUrl: './loan-paydown.component.scss'
})

export class LoanPaydownComponent {
  initialBalance!: number;
  firstPaymentDueDate!: Date;
  interestRate!: number;
  monthlyPayment!: number;
  extraPrincipalPayments!: ExtraPincipalComponent[];

  firstName!: string;
  lastName!: string;
}