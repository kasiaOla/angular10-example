import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridOptions } from '@ag-grid-community/all-modules';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { AnnouncementService } from 'src/app/shared/shared-services/announcement.service';
import { Announcement } from '../announcements/announcement';
import { LoggerService } from '../../shared/shared-services/logger.service';
import { AgGridHeaderComponent } from '../../shared/ag-grid-header/ag-grid-header.component';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public rowDatatAnnouncement: Announcement[] = [];
  public gridApi: GridApi | undefined;
  public gridColumnApi!: ColumnApi;
  public columnDefs = [
    { headerName: 'Miasto', field: 'title', colId: 'title', editable: true },
    { headerName: 'Cena', field: 'price', colId: 'price' },
    { headerName: 'Powierzchnia', field: 'surface', colId: 'surface' }
  ];
  public gridOptions: GridOptions = {
    suppressRowClickSelection: false,
    rowMultiSelectWithClick: false,
  };
  public defaultColumn: ColDef = {
    filter: true,
    sortable: true,
    headerCheckboxSelectionFilteredOnly: true,
    filterParams: {
      clearButton: true
    },
    width: 350,
    resizable: true,
  };
  public frameworkComponents = {
    agColumnHeader: AgGridHeaderComponent,
  };
  public getDataAnnouncement$;
  public resutDataAnnouncement: Subscription;

  constructor(public announcementService: AnnouncementService, private logger: LoggerService) {
    this.getDataAnnouncement$ = this.announcementService.getAnnouncement();
  }

  ngOnInit(): void {
    this.resutDataAnnouncement = this.getDataAnnouncement$.subscribe({
      next: (Res: { [x: string]: Announcement[]; }) => {
        this.rowDatatAnnouncement = Res['respons'];
      },
      error: (Err: Error) => {
        this.logger.info('Błąd pobrania ogłoszeń. Error: ' + Err);
      },
      complete(): void { }
    });
  }

  ngOnDestroy(): void {
    this.resutDataAnnouncement.unsubscribe();
  }

  onGridReady(params: { api: GridApi; columnApi: ColumnApi }): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
