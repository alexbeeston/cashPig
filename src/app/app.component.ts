import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { InputFieldComponent } from './input-field/input-field.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, InputFieldComponent ],
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
    console.log("parsing" + stringLiteral);
    return Number(stringLiteral);
  }
}
