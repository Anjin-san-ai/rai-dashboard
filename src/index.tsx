/**
 * RAI Dashboard - Responsible AI Dashboard Component Library
 * 
 * A standalone, static dashboard for Responsible AI monitoring that can be
 * embedded in any React application.
 * 
 * @example
 * ```tsx
 * import { RAIDashboard } from 'rai-dashboard';
 * import 'rai-dashboard/style.css';
 * 
 * function App() {
 *   return <RAIDashboard />;
 * }
 * ```
 */

// Main dashboard component
export { default as RAIDashboard } from './RAIDashboard';
export type { RAIDashboardProps } from './RAIDashboard';

// Individual components for advanced usage
export {
  Card,
  PageLayout,
  Logo,
  Sidebar,
  type DashboardSection
} from './components';

// Charts
export {
  RAIScoreChart,
  ESGChart,
  CostAnalysisChart,
  GuardrailsEffectivenessChart
} from './components/charts';

// Pages
export {
  OverviewPage,
  GuardrailsDashboard,
  LiveDashboard,
  PolicyDashboard,
  SustainabilityPage,
  PerformancePage
} from './components/pages';

// Mock data (for testing/development)
export * from './data';

// Import styles
import './index.css';
