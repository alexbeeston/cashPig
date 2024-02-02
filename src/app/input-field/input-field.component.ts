import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { InputType } from '../input-type';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})

export class InputFieldComponent implements OnInit {
  ngOnInit(): void {
    this.emitter.emit(this.defaultValue);
  }

  @Input() nameAttribute!: string;
  @Input() label!: string;
  @Input() helpText!: string;
  @Input() defaultValue!: string;
  @Input() inputType!: InputType;
  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();

  getStringForInputType(): string {
    switch (this.inputType) {
      case InputType.date:
        return "date";
      case InputType.number:
        return "number";
      default:
        return "text";
    }
  }
}
