import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'shared/types';

@Component({
  selector: 'character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  @Input() character: Character | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
