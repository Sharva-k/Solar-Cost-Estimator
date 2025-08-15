function calculateSolar(){
    const area=float(document.querySelector('.d1 input').value);
    const sunhours=float(document.querySelector('.d2 input').value);
    const dailyEnergyUsage=float(document.querySelector('.d3 input').value);

    if(!area||!sunhours||!dailyEnergyUsage||sunhours<=0||area<=0||dailyEnergyUsage<=0){
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    const PANEL_EFFICIENCY = 0.20; 
    const PANEL_AREA = 2; 
    const SOLAR_IRRADIANCE = 1000; 
    const PERFORMANCE_RATIO = 0.75;
    const COST_PER_KW = 131553.12 ; 
    const PANEL_LIFESPAN = 25;

    const available_panels=Math.floor(area/PANEL_AREA);
    const systemCapacityKW = (availablePanels * PANEL_AREA * SOLAR_IRRADIANCE * PANEL_EFFICIENCY) / 1000;
    const dailyEnergyOutputKWh = systemCapacityKW * sunlightHours * PERFORMANCE_RATIO;
    const systemCost = systemCapacityKW * COST_PER_KW;
    const energyCoverage = Math.min((dailyEnergyOutputKWh / dailyEnergyUsage) * 100, 100);
    const electricityCostPerKWh = 10.52;
    const annualEnergyProduction = dailyEnergyOutputKWh * 365;
    const annualSavings = annualEnergyProduction * electricityCostPerKWh;
    const paybackPeriod = systemCost / annualSavings;
}

