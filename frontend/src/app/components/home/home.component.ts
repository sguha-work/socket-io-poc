import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public cars: any = [];
  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.carService.getAllCar().subscribe((data)=>{
      this.cars = data;
      console.log('car data', this.cars);
    },(error)=>{

    });
  }

}
