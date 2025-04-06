import React from 'react';
import './OperationalMetricsPage.css';

const OperationalMetricsPage = () => {
  // Example static data for demonstration purposes
  const productionMetrics = {
    totalMaterialMined: '500,000 tons',
    dailyProductionRate: '20,000 tons/day',
    oreGrade: '2.5% Cu',
    wasteToOreRatio: '3:1'
  };

  const equipmentUtilization = {
    availability: '90%',
    operationalHours: '18 hours/day',
    downtime: '2 hours/day',
    efficiency: '95%'
  };

  const safetyMetrics = {
    incidentRate: '2 incidents/month',
    safetyComplianceRate: '98%',
    nearMisses: '5 near misses/month'
  };

  const environmentalImpact = {
    energyConsumption: '1,200 MWh/month',
    emissions: '300 tons CO2/month',
    waterUsage: '500,000 gallons/month',
    rehabilitationProgress: '60%'
  };

  const financialPerformance = {
    costPerTon: '$50/ton',
    revenuePerTon: '$100/ton',
    profitMargin: '50%'
  };

  const operationalEfficiency = {
    cycleTime: '15 minutes',
    utilizationRate: '85%',
    laborProductivity: '50 tons/worker/day'
  };

  return (
    <div className="operational-metrics-container">
      <header className="header">
        <h2>Operational Metrics</h2>
      </header>
      
      <section className="metrics-section">
        <h3>Production Metrics</h3>
        <ul>
          <li>Total Material Mined: {productionMetrics.totalMaterialMined}</li>
          <li>Daily Production Rate: {productionMetrics.dailyProductionRate}</li>
          <li>Ore Grade: {productionMetrics.oreGrade}</li>
          <li>Waste to Ore Ratio: {productionMetrics.wasteToOreRatio}</li>
        </ul>
      </section>

      <section className="metrics-section">
        <h3>Equipment Utilization</h3>
        <ul>
          <li>Availability: {equipmentUtilization.availability}</li>
          <li>Operational Hours: {equipmentUtilization.operationalHours}</li>
          <li>Downtime: {equipmentUtilization.downtime}</li>
          <li>Efficiency: {equipmentUtilization.efficiency}</li>
        </ul>
      </section>

      <section className="metrics-section">
        <h3>Safety Metrics</h3>
        <ul>
          <li>Incident Rate: {safetyMetrics.incidentRate}</li>
          <li>Safety Compliance Rate: {safetyMetrics.safetyComplianceRate}</li>
          <li>Near Misses: {safetyMetrics.nearMisses}</li>
        </ul>
      </section>

      <section className="metrics-section">
        <h3>Environmental Impact</h3>
        <ul>
          <li>Energy Consumption: {environmentalImpact.energyConsumption}</li>
          <li>Emissions: {environmentalImpact.emissions}</li>
          <li>Water Usage: {environmentalImpact.waterUsage}</li>
          <li>Rehabilitation Progress: {environmentalImpact.rehabilitationProgress}</li>
        </ul>
      </section>

      <section className="metrics-section">
        <h3>Financial Performance</h3>
        <ul>
          <li>Cost per Ton: {financialPerformance.costPerTon}</li>
          <li>Revenue per Ton: {financialPerformance.revenuePerTon}</li>
          <li>Profit Margins: {financialPerformance.profitMargin}</li>
        </ul>
      </section>

      <section className="metrics-section">
        <h3>Operational Efficiency</h3>
        <ul>
          <li>Cycle Time: {operationalEfficiency.cycleTime}</li>
          <li>Utilization Rate: {operationalEfficiency.utilizationRate}</li>
          <li>Labor Productivity: {operationalEfficiency.laborProductivity}</li>
        </ul>
      </section>
    </div>
  );
};

export default OperationalMetricsPage;
