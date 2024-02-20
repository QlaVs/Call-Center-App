import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'journal',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css'
})

export class JournalComponent {
  title = 'Journal Page Title';
}
