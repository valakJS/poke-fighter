import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { tiposPokemon, figthMatrix } from '../constants';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss']
})
export class FightComponent implements OnInit {

  form: FormGroup
  powerA: number
  powerB: number
  tiposAfiltered: Observable<string[]>
  tiposBfiltered: Observable<string[]>
  levels = [ 0, 1, 2, 3, 4]
  evolutions = [
    {
      desc: 'Sin evolución',
      value: 0
    },
    {
      desc: '2 de 2',
      value: 3
    },
    {
      desc: '2 de 3',
      value: 2
    },
    {
      desc: '3 de 3',
      value: 4
    },
  ]
  levelA: number
  levelB: number
  evoA: number
  evoB: number

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  updateLevelA(event): void {
    console.log(event)
  }

  calcular(): void {
    if (this.form.valid) {
      const tipoA = this.form.controls.tipoA.value
      const valorA = this.form.controls.valorA.value
      const valorB = this.form.controls.valorB.value
      const tipoB = this.form.controls.tipoB.value
      this.powerA = (this.getMultiplier(tipoA, tipoB) * valorA) + this.levelA + this.evoA
      this.powerB = (this.getMultiplier(tipoB, tipoA) * valorB) + this.levelB + this.evoB
    }
  }

  getMultiplier(tipoA: string, tipoB: string): number {
    const i_a = tiposPokemon.indexOf(tipoA)
    const i_b = tiposPokemon.indexOf(tipoB)
    return i_a >= 0 && i_b >= 0 ? figthMatrix[i_a][i_b] : 0
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      tipoA: [null, Validators.required],
      valorA: [null, Validators.required],
      tipoB: [null, Validators.required],
      valorB: [null, Validators.required],
    })
    this.tiposAfiltered = this.form.controls.tipoA.valueChanges.pipe(
      startWith(''),
      map(tipoA => this._filter(tipoA))
    )
    this.tiposBfiltered = this.form.controls.tipoB.valueChanges.pipe(
      startWith(''),
      map(tipoB => this._filter(tipoB))
    )
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return tiposPokemon.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
