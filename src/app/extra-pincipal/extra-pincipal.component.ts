import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-extra-pincipal',
  standalone: true,
  imports: [],
  templateUrl: './extra-pincipal.component.html',
  styleUrl: './extra-pincipal.component.scss'
})

export class ExtraPincipalComponent {
  constructor(@Inject(String) a: number, @Inject(String)d: Date) {
    this.amount = a;
    this.paymentDate = d;
  }

  paymentDate!: Date;
  amount!: number;
}
