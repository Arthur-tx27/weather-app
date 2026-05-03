import { UnitProvider } from '../features/toggle-units';
import { SelectedDayProvider } from '../entities/weather';
import { HomePage } from '../pages/home';

export function App() {
  return (
    <UnitProvider>
      <SelectedDayProvider>
        <HomePage />
      </SelectedDayProvider>
    </UnitProvider>
  );
}
