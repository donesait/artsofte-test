import {Component, Input, OnInit} from '@angular/core';
import {YandexMapService} from "../../../../pages/map-companies/services/yandex-map.service";
import {debounceTime, filter, takeUntil, tap} from "rxjs";
import {ICoordinates} from "../../../../pages/map-companies/data/models/coordinates.interface";
import {DestroyService} from "@core";
import {ICompanyShortInformation} from "../../../../pages/map-companies/data/models/company-short-information.type";

declare const ymaps: any;

@Component({
  selector: 'app-ya-map',
  templateUrl: './yandex-map.component.html',
  styleUrl: './styles/yandex-map.component.scss',
  standalone: true,
  providers: [DestroyService]
})
export class YandexMapComponent implements OnInit {
  @Input() public latitude: number = 30;
  @Input() public longitude: number = 40;
  private _map: any;

  constructor(private readonly _yandexMapService: YandexMapService, private readonly _destroy$: DestroyService) {
  }


  public ngOnInit(): void {
    ymaps.ready().done(() => this.createMap());
    this.subscribeOnCurrentCoordinates();
    this.subscribeOnAllCompaniesCoordinates();
  }

  private createMap(): void {
    this._map = new ymaps.Map('map', {
      center: [30, 40],
      zoom: 2
    });

    this._map.controls.remove('geolocationControl'); // удаляем геолокацию
    this._map.controls.remove('searchControl'); // удаляем поиск
    this._map.controls.remove('trafficControl'); // удаляем контроль трафика
    this._map.controls.remove('typeSelector'); // удаляем тип
    this._map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    this._map.controls.remove('rulerControl'); // удаляем контрол правил
  }

  private subscribeOnCurrentCoordinates(): void {
    this._yandexMapService.currentCoordinates$.pipe(
      debounceTime(300),
      filter((coordinates: ICoordinates) => Boolean(coordinates.latitude)),
      tap((coordinates: ICoordinates) => ymaps.ready().done(() => this.setCenter(coordinates))),
      takeUntil(this._destroy$),
    ).subscribe();
  }

  private setCenter(coordinates: ICoordinates): void {
    this._map.panTo([coordinates.latitude, coordinates.longitude], {duration: 700}).then(() => this._map.setZoom(7, {delay: 700}))
  }

  private subscribeOnAllCompaniesCoordinates(): void {
    this._yandexMapService.allCompaniesShortInformation$.pipe(
      tap((companyShortInformation: ICompanyShortInformation[]) => ymaps.ready().done(() => this.addPlacemark(companyShortInformation)))
    ).subscribe()
  }

  private addPlacemark(companyShortInformation: ICompanyShortInformation[]): void {
    companyShortInformation.forEach((shortInformation: ICompanyShortInformation) => {
      let placemark = new ymaps.Placemark([shortInformation.latitude, shortInformation.longitude], {
        balloonContent: this.generateBalloonContent(shortInformation)
      })
      this._map.geoObjects.add(placemark);

    })
  }

  private generateBalloonContent(shortInformation: ICompanyShortInformation): string {
    return `
			<div class="balloon">
				<div class="balloon__address">suffix: ${shortInformation.business_name}</div>
				<div class="balloon__address">type: ${shortInformation.type}</div>
				<div class="balloon__contacts"><a href="tel:${shortInformation.phone_number}">${shortInformation.phone_number}</a></div>
			</div>
		`
  }
}
