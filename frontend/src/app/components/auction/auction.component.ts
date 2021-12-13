import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {
  public currentPrice: number = 0;
  public increseLimit: number = 10;
  @Input() carid: any = '';
  constructor() { }

  ngOnInit(): void {
    //@ts-ignore
    socket.on('price updated', (data)=> {
      console.log('received data ', data);
      this.currentPrice = data.currentPrice;
      console.log(this.currentPrice);
    });
  }

  public setBidePrice() {
    this.currentPrice+=this.increseLimit;
    let objectToSend = {
      carId: this.carid,
      currentPrice: this.currentPrice
    };
    alert(this.carid);
    //@ts-ignore
    socket.emit('price updated', objectToSend);
  }

}
