import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../shared/game';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'app-game-new',
  templateUrl: './game-new.component.html',
  styleUrls: ['./game-new.component.scss']
})
export class GameNewComponent implements OnInit {

  pageTitle = 'Game New';
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
    this.gameId = parseInt(this.activatedroute.snapshot.params['gameId']);
  }


  saveGame(): void {
    if (this.gameForm.valid) {
      if (this.gameForm.dirty) {
        this.game = this.gameForm.value;
        this.game.id = this.gameId;
        
        this.gameService.createGame(this.game)
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
