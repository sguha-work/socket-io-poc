import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
  public carSocket: any;
  private carId: string = '';
  @Input() id: string = '';
  constructor(private ref: ChangeDetectorRef, private route: ActivatedRoute, private carService: CarService, private userService: UserService) {
    
  }
  ngOnInit(): void {
    if (this.id != '') {
      this.carId = this.id;
      this.loadCar(this.id);
    } else {
      this.route.params.subscribe((params: any) => {
        this.carId = params.id;
        this.loadCar(params.id);
      });
    }
    let wsUrl = (location.hostname === 'localhost') ? `localhost:3000` : `${location.hostname}:${location.port ? location.port : ''}`;
    console.log('wsUrl '+`wss://${wsUrl}/car/${this.carId}`);
    //@ts-ignore
    this.carSocket = io(`wss://${wsUrl}/car/${this.carId}`);
    //@ts-ignore
    //this.carSocket = io('/car',wsUrl);
    // creating listner for socket
    //@ts-ignore
    console.log('*************** listner added **********');
    this.carSocket.on('price updated', (payload: any) => {
      console.log('received data from car socket', payload);
      if (payload.carId == this.carId) {
        this.car.currentBid = payload.bidValue;
        this.ref.detectChanges();
      }
    });
  }
  private loadCar(id: string): void {
    this.carService.getCar(id).subscribe((data) => {
      console.log('received card data', data);
      this.car = data[0];
      this.currentPrice = this.car.currentBid;
    }, (error: any) => {
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
    this.carSocket.emit('bid enterred', objectToSend);
  }
}
