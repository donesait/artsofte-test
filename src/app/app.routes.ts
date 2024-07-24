import {Routes} from '@angular/router';
import {ListComponent} from "./pages/list/components/list.component";
import {CompanyDetailComponent} from "./pages/company-detail/components/company-detail.component";
import {MapCompaniesComponent} from "./pages/map-companies/components/map-companies.component";

export const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: ListComponent},
  {path: 'detail/:companyId', component: CompanyDetailComponent},
  {path: 'map', component: MapCompaniesComponent}
];
