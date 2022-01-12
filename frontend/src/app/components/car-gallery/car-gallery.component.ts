import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-gallery',
  templateUrl: './car-gallery.component.html',
  styleUrls: ['./car-gallery.component.scss']
})
export class CarGalleryComponent implements OnInit,AfterViewInit {
  public carIds: any = [];
  constructor(private carService: CarService) { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    alert('getting car data');
    let temIds: any = [];
    this.carService.getAllCar().subscribe((data) => {
      for(let index in data) {
        temIds.push(data[index]['_id']);
      }
      this.carIds = temIds;
      console.log('id lists',this.carIds);

    }, (error) => {

    });  
  }

}
