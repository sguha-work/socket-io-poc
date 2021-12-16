import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  public car: any;
  public increseLimit: number = 10;
  public currentPrice: number = 0;
  constructor(private route: ActivatedRoute, private carService: CarService, private userService: UserService) { 
    this.route.params.subscribe((params: any) => {
      this.loadCar(params.id);
    });
  }

  private loadCar(id: string): void{
    this.carService.getCar(id).subscribe((data)=>{
      console.log('received card data', data);
      this.car = data[0];
    },(error: any)=>{
      console.error(error);
    });
  }
  public setBidePrice() {
    this.currentPrice += this.increseLimit;
    let objectToSend = {
      carId: this.car['_id'],
      bidValue: this.currentPrice,
      bidderId: this.userService.getUserInfo()
    };
    //@ts-ignore
    socket.emit('bid enterred', objectToSend);    
  }

  ngOnInit(): void {
  }

}
