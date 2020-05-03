import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material.module';
import { GraphQLModule } from './modules/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { MovieSelectorComponent } from './selectors/movie-selector/movie-selector.component';
import { SpeciesSelectorComponent } from './selectors/species-selector/species-selector.component';
import { CharacterSelectorComponent } from './selectors/character-selector/character-selector.component';
import { CharactersViewComponent } from './characters-view/characters-view.component';
import { CharacterCardComponent } from './character-card/character-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieSelectorComponent,
    SpeciesSelectorComponent,
    CharacterSelectorComponent,
    CharactersViewComponent,
    CharacterCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
