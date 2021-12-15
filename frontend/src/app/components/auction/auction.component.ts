import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';
import { AuctionService } from 'src/app/services/auction.service';
@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {
  public increseLimit: number = 10;
  @Input() car: any = '';
  public currentPrice: number = 0;
  constructor(private ref: ChangeDetectorRef, private userService: UserService, private auctionService: AuctionService) { }

  ngOnInit(): void {
    this.currentPrice = parseInt(this.car.currentBid);
    //@ts-ignore
    socket.on('price updated', (data) => {
      console.log('received data ', data);
      if (data.carId === this.car['_id']) {console.log(data.bidValue);
        this.currentPrice = data.bidValue;
        this.ref.detectChanges();
      }
    });


  }

  public setBidePrice() {
    this.currentPrice += this.increseLimit;
    let objectToSend = {
      carId: this.car['_id'],
      bidValue: this.currentPrice,
      bidderId: this.userService.getUserInfo()
    };
    this.auctionService.addAuctionEntry(objectToSend).subscribe((data)=>{
      let auctionRoomName: string = this.car['_id']+'-auctionRoom';
      //@ts-ignore
    //   socket.on('connect', function() {
    //     //@ts-ignore
    //     socket.emit('room', room);
    //  });
    },(error)=>{

    });
  }
}
