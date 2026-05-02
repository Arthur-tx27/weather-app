import { UnitProvider } from '../features/toggle-units';
import { HomePage } from '../pages/home';

export function App() {
  return (
    <UnitProvider>
      <HomePage />
    </UnitProvider>
  );
}
