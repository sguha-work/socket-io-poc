import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public cars: any = [];
  constructor(private carService: CarService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.carService.getAllCar().subscribe((data) => {
      this.cars = data;
      console.log('car data', this.cars);
      //@ts-ignore
      socket.on('price updated', (data) => {
        console.log('received data ', data);
        let cars = this.cars;
        for (let index in this.cars) {
          if (data.carId == this.cars[index]['_id']) {
            console.log('setting value');
            //this.currentPrice = data.bidValue;
            cars[index].currentBid = data.bidValue;
          }
        }
        console.log('updated cars ', cars);
        this.cars = cars;
        //this.ref.detectChanges();
      });
    }, (error) => {

    });
  }

}
