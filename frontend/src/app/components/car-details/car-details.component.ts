import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  public car: any = null;
  public increseLimit: number = 10;
  public currentPrice: number = 0;
  //public carSocket: any;
  constructor(private ref: ChangeDetectorRef, private route: ActivatedRoute, private carService: CarService, private userService: UserService) { 
    this.route.params.subscribe((params: any) => {
      this.loadCar(params.id);
    });
  }
  ngOnInit(): void {
    let wsUrl = (location.hostname === 'localhost') ? `localhost:3000` : `${location.hostname}:${location.port ? location.port : ''}`;
    //@ts-ignore
    //this.carSocket = io('/car',wsUrl);
    // creating listner for socket
    //@ts-ignore
    carSocket.on('price updated', (payload: any) => {
      console.log('received data from car socket', payload);
      this.car.currentBid = payload.bidValue;
      this.ref.detectChanges();     
    });
  }
  private loadCar(id: string): void{
    this.carService.getCar(id).subscribe((data)=>{
      console.log('received card data', data);
      this.car = data[0];
      this.currentPrice = this.car.currentBid;      
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
    carSocket.emit('bid enterred', objectToSend);    
  }
}
