import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {
  public currentPrice: number = 0;
  public increseLimit: number = 10;
  @Input() carid: any = '';
  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    //@ts-ignore
    socket.on('price updated', (data) => {
      console.log('received data ', data);
      if (data.carId === this.carid) {
        this.currentPrice = data.currentPrice;
        console.log(this.currentPrice);
        this.ref.detectChanges();
      }
    });
  }

  public setBidePrice() {
    this.currentPrice += this.increseLimit;
    let objectToSend = {
      carId: this.carid,
      currentPrice: this.currentPrice
    };
    //@ts-ignore
    socket.emit('price updated', objectToSend);
  }

}
