/**
 * Example: How to use RAIDashboard in another React application
 */

import { RAIDashboard, type DashboardSection } from '../src';
// In a real app: import { RAIDashboard, type DashboardSection } from 'rai-dashboard';
// import 'rai-dashboard/style.css';

function ExampleApp() {
  const handleSectionChange = (section: DashboardSection) => {
    console.log('Active section changed to:', section);
    // You can use this to sync with your app's routing or state
  };

  return (
    <div className="h-screen w-screen">
      <RAIDashboard 
        initialSection="overview"
        onSectionChange={handleSectionChange}
        showSidebar={true}
      />
    </div>
  );
}

export default ExampleApp;


/**
 * Alternative: Using individual components
 */
// import { 
//   RAIScoreChart, 
//   ESGChart, 
//   CostAnalysisChart,
//   GuardrailsEffectivenessChart,
//   Card,
//   PageLayout
// } from 'rai-dashboard';
// 
// function CustomDashboard() {
//   return (
//     <PageLayout title="My Custom RAI Dashboard">
//       <div className="grid grid-cols-2 gap-6">
//         <Card title="RAI Score">
//           <RAIScoreChart raiScore={85} />
//         </Card>
//         <Card title="ESG Metrics">
//           <ESGChart />
//         </Card>
//         <Card title="Costs">
//           <CostAnalysisChart />
//         </Card>
//         <Card title="Guardrails">
//           <GuardrailsEffectivenessChart />
//         </Card>
//       </div>
//     </PageLayout>
//   );
// }
