import {InjectionToken} from "@angular/core";
import {enviroment} from "../../../enviroments/enviroment";

export const BASE_API_TOKEN: InjectionToken<string> = new InjectionToken<string>('Server api url',
  {providedIn: 'root', factory: () => enviroment.api})
