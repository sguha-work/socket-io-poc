import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-car-gallery-gql',
  templateUrl: './car-gallery-gql.component.html',
  styleUrls: ['./car-gallery-gql.component.scss']
})
export class CarGalleryGqlComponent implements OnInit {
  public cars: any = [];
  public increseLimit = 10;
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
        {
          cars {
            carImage
            carName
            currentBid
            carNumber
            basePrice
          }
        }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        result.data.cars.forEach((car: any) => {
          let carObj = {
            carImage: car.carImage,
            carName: car.carName,
            currentBid: car.currentBid,
            carNumber: car.carNumber,
            basePrice: car.basePrice
          }
          this.cars.push(carObj);
        });
        console.log('this.cars',this.cars);
      });
  }
  public setBidePrice() {

  }
}
