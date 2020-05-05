import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Character } from 'shared/types';

@Component({
  selector: 'character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  character: Character;

  constructor(public dialogRef: MatDialogRef<CharacterDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.character = data.character;
  }

  ngOnInit(): void {
  }

  closeClick() {
    this.dialogRef.close();
  }
}
