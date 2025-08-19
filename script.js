function calculateSolar() {
  const areaInput = document.getElementById("areaInput");
  const sunHoursInput = document.getElementById("sunHoursInput");
  const dailyUsageInput = document.getElementById("dailyUsageInput");

  const areaSqM = parseFloat(areaInput?.value);
  const sunHours = parseFloat(sunHoursInput?.value);
  const dailyEnergyUsageKWh = parseFloat(dailyUsageInput?.value);

  if (
    !areaSqM ||
    !sunHours ||
    !dailyEnergyUsageKWh ||
    sunHours <= 0 ||
    areaSqM <= 0 ||
    dailyEnergyUsageKWh <= 0
  ) {
    alert("Please enter valid positive numbers for all fields.");
    return;
  }

  // Assumptions (can later be made user-configurable)
  const PANEL_EFFICIENCY = 0.2; // 20%
  const PANEL_AREA_SQ_M = 2.0; // sq. meters per panel (approx)
  const PERFORMANCE_RATIO = 0.75; // losses
  const COST_PER_KW = 131553.12; // system cost per kW (currency unit consistent with tariff below)
  const ELECTRICITY_COST_PER_KWH = 10.52; // tariff

  // Capacity sizing
  const availablePanels = Math.floor(areaSqM / PANEL_AREA_SQ_M);
  const areaUsedSqM = availablePanels * PANEL_AREA_SQ_M;
  // Nameplate capacity: kW = area(m^2) * efficiency * 1 kW/m^2
  const systemCapacityKW = +(areaUsedSqM * PANEL_EFFICIENCY).toFixed(2);

  // Production and economics
  const dailyEnergyOutputKWh = +(
    systemCapacityKW *
    sunHours *
    PERFORMANCE_RATIO
  ).toFixed(2);
  const systemCost = +(systemCapacityKW * COST_PER_KW).toFixed(2);
  const energyCoveragePct = Math.min(
    (dailyEnergyOutputKWh / dailyEnergyUsageKWh) * 100,
    100
  );
  const annualEnergyProductionKWh = +(dailyEnergyOutputKWh * 365).toFixed(0);
  const annualSavings = +(
    annualEnergyProductionKWh * ELECTRICITY_COST_PER_KWH
  ).toFixed(2);
  const paybackYears =
    systemCost > 0 && annualSavings > 0
      ? +(systemCost / annualSavings).toFixed(1)
      : Infinity;

  // Update UI
  const results = document.getElementById("results");
  const outputEl = document.getElementById("output");
  const costEl = document.getElementById("cost");
  const coverageEl = document.getElementById("coverage");
  const panelsEl = document.getElementById("panels");
  const capacityEl = document.getElementById("capacity");
  const annualProdEl = document.getElementById("annual");
  const savingsEl = document.getElementById("savings");
  const paybackEl = document.getElementById("payback");

  if (outputEl) outputEl.textContent = `${dailyEnergyOutputKWh} kWh/day`;
  if (costEl) costEl.textContent = formatCurrency(systemCost);
  if (coverageEl)
    coverageEl.textContent = `${energyCoveragePct.toFixed(0)}% of daily usage`;
  if (panelsEl)
    panelsEl.textContent = `${availablePanels} panels (${areaUsedSqM} m² used)`;
  if (capacityEl) capacityEl.textContent = `${systemCapacityKW} kW`;
  if (annualProdEl)
    annualProdEl.textContent = `${annualEnergyProductionKWh} kWh/year`;
  if (savingsEl)
    savingsEl.textContent = formatCurrency(annualSavings) + " / year";
  if (paybackEl)
    paybackEl.textContent = isFinite(paybackYears)
      ? `${paybackYears} years`
      : "N/A";

  if (results) results.style.display = "block";

  // Chart removed; table is updated above
}

function formatCurrency(value) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  } catch (_e) {
    // Fallback if Intl or currency not available
    return `₹${Number(value).toLocaleString()}`;
  }
}

// Chart code removed
