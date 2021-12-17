import { Component, Input, OnInit, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';
import { AuctionService } from 'src/app/services/auction.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit,OnChanges  {
  public increseLimit: number = 10;
  @Input() car: any = '';
  public currentPrice: number = 0;
  constructor(private router: Router,private ref: ChangeDetectorRef, private userService: UserService, private auctionService: AuctionService) { }

  ngOnInit(): void {console.log('auction initiated');
    this.currentPrice = parseInt(this.car.currentBid);
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('changes called');
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
  redirectToCarDetails(id:string) {
    this.router.navigate(['car', id]);// (1)
  }
}
