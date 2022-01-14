import { Component, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
const sub = gql`subscription{
  bidEntered {
    carNumber,
    currentBid
  }
}`;
const dummy = gql`query{fakequery}`;
@Component({
  selector: 'app-car-gallery-gql',
  templateUrl: './car-gallery-gql.component.html',
  styleUrls: ['./car-gallery-gql.component.scss']
})
export class CarGalleryGqlComponent implements OnInit {
  public cars: any = [];
  public increseLimit = 10;
  private queryRef: QueryRef<any>;
  constructor(private apollo: Apollo) {
    this.queryRef = this.apollo.watchQuery({
      query: dummy
    });
  }

  ngOnInit(): void {
    this.getAllCars();
    this.subscribeBidding();
  }
  private getAllCars() {
    this.apollo
      .watchQuery({
        query: gql`
        {
          getCars {
            id,
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
        result.data.getCars.forEach((car: any) => {
          let carObj = {
            carImage: car.carImage,
            carName: car.carName,
            currentBid: car.currentBid,
            carNumber: car.carNumber,
            basePrice: car.basePrice,
            id: car.id
          }
          this.cars.push(carObj);
        });
      });
  }
  private subscribeBidding() {
    this.queryRef.subscribeToMore({
      document: sub,
      updateQuery: (prev, { subscriptionData }) => {
        let carData = subscriptionData.data.bidEntered;
        this.updateCarInfo(carData);
      }
    })
  }
  private updateCarInfo(carData: object) {
    this.cars.forEach((car: any) => {
      //@ts-ignore
      if(car.carNumber == carData.carNumber) {
        //@ts-ignore
        car.currentBid = carData.currentBid;
      }
    });
  }
  public setBidPrice(id: String, currentBid: number) {
    this.apollo.mutate({
      mutation: gql`
      mutation updateBidPrice($id: String!, $currentBid: Int!) {
        updateBidPrice(id: $id, currentBid: $currentBid) {
          carNumber
          currentBid
        }
      }
    `,
      variables: {
        id: id,
        currentBid: currentBid + this.increseLimit
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the mutation', error);
    });
  }


}
