import { NavigationView } from './navigation.view';
import { NavigationModel } from './navigation.model';

export class NavigationController {
  view = new NavigationView();
  model = new NavigationModel();

  constructor() {
  }
}
