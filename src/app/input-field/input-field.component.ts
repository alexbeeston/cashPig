import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})

export class InputFieldComponent {
  @Input() nameAttribute!: string;
  @Input() label!: string;
  @Input() helpText!: string;
}