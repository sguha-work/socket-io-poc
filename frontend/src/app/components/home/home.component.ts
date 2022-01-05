import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { AuctionComponent } from '../auction/auction.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public cars: any = [];
  constructor(private router: Router, private carService: CarService, private ref: ChangeDetectorRef) { }
  //@ts-ignore
  //@ViewChild(AuctionComponent, { static: false }) child: AuctionComponent;
  ngOnInit(): void {
    this.carService.getAllCar().subscribe((data) => {
      this.cars = data;
      console.log('car data', this.cars);
    }, (error) => {

    });
    //@ts-ignore
    socket.on('price updated', (payload) => {
      console.log('received data ', payload);
      let cars = this.cars;
      this.cars = [];
      for (let index in cars) {
        if (payload.carId == cars[index]['_id']) {
          console.log('setting value');
          cars[index].currentBid = payload.bidValue;
        }
      }
      console.log('updated cars ', cars);
      this.cars = cars;
      this.ref.detectChanges();


    });
  }
  public goToCarGallery(): void {
    this.router.navigate(['/gallery']);
  }
  ngAfterViewInit(): void {
    //console.log('child',this.child);
  }

}
