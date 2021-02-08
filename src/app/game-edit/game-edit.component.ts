import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../shared/game';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss']
})
export class GameEditComponent implements OnInit {

  pageTitle = 'Game Edit';
  errorMessage: string;
  gameForm: FormGroup;

  gameId:number;
  game: Game;
  
  constructor(private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private gameService: GameService) { }

  ngOnInit(): void {
    this.gameForm = this.fb.group({
      nombre: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      categorias: '',
      valoracion: '',
      precio: '',
      descripcion: '',
      fechadesalida: '',
      image: '',
      empresa: ''
    });

    // Read the gameId from the route parameter
    this.gameId = parseInt(this.activatedroute.snapshot.params['id']);
    this.getGame(this.gameId);
  }



  getGame(id: number): void {
    this.gameService.getGameById(id)
      .subscribe(
        (game: Game) => this.displayGame(game),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayGame(game: Game): void {
    if (this.gameForm) {
      this.gameForm.reset();
    }
    this.game = game;
    this.pageTitle = `Edit Game: ${this.game.nombre}`;

    // Update the data on the form
    this.gameForm.patchValue({
      nombre: this.game.nombre,
      precio: this.game.precio,
      valoracion: this.game.valoracion,
      descripcion: this.game.descripcion,
      empresa: this.game.empresa,
      categorias: this.game.categorias,
      imagen: this.game.imagen,
      fechadesalida: this.game.fechadesalida
    });
  }


  deleteGame(): void {
    if (this.game.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the game: ${this.game.nombre}?`)) {
        this.gameService.deleteGame(this.game.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveGame(): void {
    if (this.gameForm.valid) {
      if (this.gameForm.dirty) {
        this.game = this.gameForm.value;
        this.game.id = this.gameId;
        
        this.gameService.updateGame(this.game)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
      
        
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.gameForm.reset();
    this.router.navigate(['']);
  }

}
