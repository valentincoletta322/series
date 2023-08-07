import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from '../db.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  data!: any;
  datosSerie!: any;
  seRecibio!: boolean;
  error: string;
  fromYear!: number;
  fromMonth!: number;
  toYear!: number;
  toMonth!: number;

  constructor(
    private userService: UserServiceService,
    private router: Router,
  ) {
    this.error="";
      this.fromYear = new Date(0).getFullYear();
      this.fromMonth = new Date(0).getMonth();
      this.toYear = new Date(0).getFullYear();
      this.toMonth = new Date(0).getMonth();
  }
  ngOnInit(): void {
  }

  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/register']);
      })
      .catch(error  => console.log(error));
  }
  async onSubmit() {
    let inicio: String = this.fromYear + '-' + this.fromMonth + '-1'
    let final: String = this.toYear + '-' + this.toMonth + '-1'
    const opt = {
      inicio: inicio,
      final: final
    }

    console.log(this.userService.getUid())
    this.userService.getDatos(opt).subscribe({
      next: (response) => {
        this.datosSerie = JSON.parse(JSON.stringify(response)).data;
        this.seRecibio = true;
      },
      error: (error) => {
        this.error = error;
      }
    });
  }

}