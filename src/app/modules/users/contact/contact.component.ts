import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../shared/shared-services/location/location.service';
import { map, share } from 'rxjs/operators';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  locations = this.locationService.getLocations();
  searchValue: string;

  constructor(public locationService: LocationService) { }

  ngOnInit(): void { }

  search(value: string): void {
    this.searchValue = value;
    this.locations =  this.locationService.locationSession$.pipe(
      map(result => result.filter(valueFilter => valueFilter.name.indexOf(this.searchValue) >= 0)),
      share(),
    );
  }
}
