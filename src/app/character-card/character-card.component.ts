import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'shared/types';
import { MatDialog } from '@angular/material/dialog';
import { CharacterDetailsComponent } from '../character-details/character-details.component';

@Component({
  selector: 'character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  @Input() character: Character | undefined;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSelect() {
    this.dialog.open(CharacterDetailsComponent, {
      data: { character: this.character },
      autoFocus: false
    });
  }
}
