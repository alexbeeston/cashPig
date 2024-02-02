import { Component } from '@angular/core';

@Component({
  selector: 'app-extra-pincipal',
  standalone: true,
  imports: [],
  templateUrl: './extra-pincipal.component.html',
  styleUrl: './extra-pincipal.component.scss'
})

export class ExtraPincipalComponent {
  paymentDate!: Date;
  amount!: number;
}
