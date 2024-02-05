import { Component, computed, Input, Signal, signal, WritableSignal } from '@angular/core';
import { ExtraPincipalComponent } from '../extra-pincipal/extra-pincipal.component';
import { first } from 'rxjs';

@Component({
  selector: 'app-loan-paydown',
  standalone: true,
  imports: [],
  templateUrl: './loan-paydown.component.html',
  styleUrl: './loan-paydown.component.scss'
})

export class LoanPaydownComponent {
  firstName: WritableSignal<string> = signal("Fred");
  lastName: WritableSignal<string> = signal("Flintstone");

  fullName: Signal<string> = computed(() => {
    console.log("Evaluating");
    return this.firstName() + this.lastName()
  });
}