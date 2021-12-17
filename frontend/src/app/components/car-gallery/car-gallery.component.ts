import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-gallery',
  templateUrl: './car-gallery.component.html',
  styleUrls: ['./car-gallery.component.scss']
})
export class CarGalleryComponent implements OnInit {
  public carIds: any = [];
  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.carService.getAllCar().subscribe((data) => {
      for(let index in data) {
        this.carIds.push(data[index]['_id']);
      }console.log('id lists',this.carIds);
    }, (error) => {

    });
  }

}
