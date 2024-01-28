import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

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
  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();
}
