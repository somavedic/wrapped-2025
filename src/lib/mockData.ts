export const MOCK_DATA = {
  year: 2025,
  globalReach: {
    totalCountries: 62,
    topRegions: ["Europe", "North America", "Japan", "Australia"],
    newMarkets: ["Brazil", "South Korea"],
  },
  products: {
    topModel: "Amber",
    distribution: [
      { name: "Amber", percentage: 45, color: "#FFB800" },
      { name: "Vedic", percentage: 30, color: "#E5E5E5" },
      { name: "Anthracite", percentage: 15, color: "#1A1A1A" },
      { name: "Others", percentage: 10, color: "#333333" },
    ],
    totalUnits: 125430,
  },
  impact: {
    totalHoursHarmonized: 2450000, // Calculated impact
    waterStructuredLiters: 890000,
  },
  salesTrends: [
    { month: "Jan", sales: 8500 },
    { month: "Feb", sales: 9200 },
    { month: "Mar", sales: 11000 },
    { month: "Apr", sales: 10500 },
    { month: "May", sales: 13000 },
    { month: "Jun", sales: 14500 },
    { month: "Jul", sales: 14000 },
    { month: "Aug", sales: 15500 },
    { month: "Sep", sales: 18000 },
    { month: "Oct", sales: 21000 },
    { month: "Nov", sales: 45000 }, // Black Friday peak
    { month: "Dec", sales: 38000 },
  ],
};
