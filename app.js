const issuers = [
  {
    id: "surcos",
    name: "SURCOS SA",
    sector: "Industria quimica agropecuaria",
    source: "Datos reales tomados de vuelco-balance-SURCOS- Ago23.xlsx. Montos normalizados en ARS millones.",
    dataQuality: "EEFF reales",
    stress: { fundingCost: 34, refinancingPressure: 10, marketSensitivity: 12 },
    financials: [
      { year: 2022, revenue: 53370, ebitda: 9151, debt: 21966, cash: 1909, equity: 3441, interest: 10555, currentAssets: 43599, currentLiabilities: 34413 },
      { year: 2023, revenue: 44961, ebitda: 8235, debt: 35246, cash: 3053, equity: 6249, interest: 6795, currentAssets: 36818, currentLiabilities: 37503 },
    ],
  },
  {
    id: "pluspetrol",
    name: "PLUSPETROL SA",
    sector: "Energia / Petroleo y gas",
    source: "Datos reales tomados de vuelco-balance-PLUSPETROL- Dic24.xlsx. Montos normalizados en ARS millones.",
    dataQuality: "EEFF reales",
    stress: { fundingCost: 29, refinancingPressure: 7, marketSensitivity: 10 },
    financials: [
      { year: 2023, revenue: 174050, ebitda: 21384, debt: 365362, cash: 4807, equity: 501072, interest: 71848, currentAssets: 185296, currentLiabilities: 337401 },
      { year: 2024, revenue: 764664, ebitda: 208713, debt: 1482344, cash: 65164, equity: 2011090, interest: 82859, currentAssets: 414891, currentLiabilities: 721183 },
    ],
  },
  {
    id: "san-miguel",
    name: "SAN MIGUEL AGICIF SA",
    sector: "Industria alimenticia",
    source: "Datos reales tomados de vuelco-balance-SAN MIGUEL - Dic25.xlsx. Montos normalizados en ARS millones.",
    dataQuality: "EEFF reales",
    stress: { fundingCost: 33, refinancingPressure: 9, marketSensitivity: 11 },
    financials: [
      { year: 2024, revenue: 103614, ebitda: 9468, debt: 291166, cash: 62357, equity: 69353, interest: 26879, currentAssets: 177123, currentLiabilities: 165064 },
      { year: 2025, revenue: 172520, ebitda: 15157, debt: 394689, cash: 80012, equity: 107396, interest: 39547, currentAssets: 245894, currentLiabilities: 359313 },
    ],
  },
  {
    id: "arcor",
    name: "ARCOR SAIC",
    sector: "Alimentos y bebidas / Consumo masivo",
    source: "Datos tomados de Nosis SAC Arcor, informe FIX Arcor S.A.I.C. mayo 2026, Moody's y EEFF individual 31/12/2025. Montos normalizados en ARS millones.",
    dataQuality: "EEFF + Nosis + rating",
    stress: { fundingCost: 26, refinancingPressure: 5, marketSensitivity: 8 },
    financials: [
      { year: 2025, revenue: 5365570, ebitda: 448246, debt: 1504099, cash: 607607, equity: 1001085, interest: 160088, currentAssets: 679478, currentLiabilities: 1046265 },
      { year: 2026, revenue: 5352092, ebitda: 428292, debt: 1380395, cash: 523811, equity: 1001085, interest: 152961, currentAssets: 679478, currentLiabilities: 1046265 },
    ],
  },
  {
    id: "ypf",
    name: "YPF SA",
    sector: "Energia / Petroleo y gas integrado",
    source: "Datos tomados de Nosis SAC YPF, informe FIX YPF S.A. julio 2026, Moody's y EEFF individual 31/12/2025. Montos normalizados en ARS millones.",
    dataQuality: "EEFF + Nosis + rating",
    stress: { fundingCost: 25, refinancingPressure: 5, marketSensitivity: 9 },
    financials: [
      { year: 2025, revenue: 23240000, ebitda: 6233826, debt: 15346876, cash: 1733272, equity: 15685217, interest: 842409, currentAssets: 8420610, currentLiabilities: 8175144 },
      { year: 2026, revenue: 25326000, ebitda: 7160945, debt: 13935713, cash: 2330516, equity: 15685217, interest: 954793, currentAssets: 8420610, currentLiabilities: 8175144 },
    ],
  },
];

const externalInputs = {
  surcos: {
    sectorDefaultRate: 3.44,
    macro: {
      pbi2026: 2.8,
      pbi2027: 3.1,
      pbi2028: 3.0,
      inflation12m: 24.1,
      policyRate2026: 22.12,
      countryRiskLatest: 435,
      countryRiskAverage: 677,
    },
    rating: {
      agency: "FIX",
      issuerRating: "D(arg)",
      perspective: "sin perspectiva positiva",
      source: "FIX - Surcos S.A., abril 2025",
      defaultSignal: true,
      detail: "Situacion concursal e incumplimiento informado por FIX.",
    },
    nosis: {
      score: 1,
      rating: "D",
      situation: 5,
      patronales: "2 ultimos meses impagos; 3 meses previos con pago parcial",
      monthlyCommitments: 376,
      pendingChecks: 0,
      source: "Nosis SAC Surcos",
    },
  },
  pluspetrol: {
    sectorDefaultRate: 2.24,
    macro: {
      pbi2026: 2.8,
      pbi2027: 3.1,
      pbi2028: 3.0,
      inflation12m: 24.1,
      policyRate2026: 22.12,
      countryRiskLatest: 435,
      countryRiskAverage: 677,
    },
    rating: {
      agency: "FIX",
      issuerRating: "AAA(arg)",
      perspective: "Estable",
      source: "FIX - Pluspetrol S.A., mayo 2026",
      defaultSignal: false,
      detail: "Calificacion AAA(arg) con perspectiva estable.",
    },
    nosis: {
      score: 824,
      rating: "nc",
      situation: 1,
      patronales: "ok",
      monthlyCommitments: 21494,
      pendingChecks: 0,
      source: "Nosis SAC Pluspetrol",
    },
  },
  "san-miguel": {
    sectorDefaultRate: 6.97,
    macro: {
      pbi2026: 2.8,
      pbi2027: 3.1,
      pbi2028: 3.0,
      inflation12m: 24.1,
      policyRate2026: 22.12,
      countryRiskLatest: 435,
      countryRiskAverage: 677,
    },
    rating: {
      agency: "FIX",
      issuerRating: "BBB-(arg)",
      shortRating: "A3(arg)",
      perspective: "Estable",
      source: "FIX - S.A. San Miguel A.G.I.C.I. y F., abril 2026",
      defaultSignal: false,
      detail: "BBB-(arg), perspectiva estable; cobertura ajustada y canje exitoso.",
    },
    nosis: {
      score: 623,
      rating: "BB",
      situation: 1,
      patronales: "ok",
      monthlyCommitments: 1164,
      pendingChecks: 545,
      source: "Nosis SAC San Miguel",
    },
  },
  arcor: {
    sectorDefaultRate: 2.76,
    macro: {
      pbi2026: 2.8,
      pbi2027: 3.1,
      pbi2028: 3.0,
      inflation12m: 24.1,
      policyRate2026: 22.12,
      countryRiskLatest: 435,
      countryRiskAverage: 677,
    },
    rating: {
      agency: "FIX / Moody's",
      issuerRating: "AAA(arg)",
      moodysRating: "Caa1.ar",
      shortRating: "A1+(arg)",
      perspective: "Estable",
      source: "FIX Arcor S.A.I.C., mayo 2026; Moody's Arcor",
      defaultSignal: false,
      detail: "AAA(arg), perspectiva estable; Moody's destaca deuda neta/EBITDA cercana a 2,2x y diversificacion regional.",
    },
    nosis: {
      score: 362,
      rating: "AAA",
      jointRating: "BBB",
      situation: 1,
      patronales: "ok",
      monthlyCommitments: 8042,
      pendingChecks: 0,
      source: "Nosis SAC Arcor",
    },
  },
  ypf: {
    sectorDefaultRate: 2.24,
    macro: {
      pbi2026: 2.8,
      pbi2027: 3.1,
      pbi2028: 3.0,
      inflation12m: 24.1,
      policyRate2026: 22.12,
      countryRiskLatest: 435,
      countryRiskAverage: 677,
    },
    rating: {
      agency: "FIX / Moody's",
      issuerRating: "AAA(arg)",
      moodysRating: "Caa1.ar",
      shortRating: "A1+(arg)",
      perspective: "Estable",
      source: "FIX YPF S.A., julio 2026; Moody's YPF",
      defaultSignal: false,
      detail: "AAA(arg), perspectiva estable; liquidez holgada, deuda neta/EBITDA 1,6x y EBITDA/intereses 7,5x.",
    },
    nosis: {
      score: 323,
      rating: "AA",
      jointRating: "BB",
      situation: 1,
      patronales: "ok",
      monthlyCommitments: 59134,
      pendingChecks: 0,
      source: "Nosis SAC YPF",
    },
  },
};

const driverCategories = [
  {
    id: "actividad",
    name: "Actividad economica",
    weights: [0.1, 0.1, 0.095],
    items: ["Mora del sector", "PBI", "Confianza del consumidor"],
    evaluate: (ctx) => {
      const positives = [];
      const negatives = [];
      const external = ctx.external;
      const sectorMora = external?.sectorDefaultRate;
      const pbi = external?.macro?.pbi2026 ?? 0;
      if (sectorMora && sectorMora <= 2.76) positives.push(`Mora sectorial ${sectorMora.toFixed(2)}% menor o igual a media total`);
      if (sectorMora && sectorMora > 2.76) negatives.push(`Mora sectorial ${sectorMora.toFixed(2)}% mayor a media total`);
      if (pbi > 0) positives.push(`PBI esperado positivo ${pbi.toFixed(1)}%`);
      if (ctx.incomeGrowth > 6) positives.push("PBI/actividad en expansion por crecimiento de ingresos");
      if (ctx.incomeGrowth < 0) negatives.push("Caida interanual de ingresos");
      if (ctx.marketStress <= 22) positives.push("Confianza y entorno sin presion alta");
      if (ctx.marketStress >= 36) negatives.push("Entorno de actividad tensionado");
      const moraPenalty = sectorMora ? Math.max(0, sectorMora - 2.76) * 2.4 : 0;
      const moraBonus = sectorMora ? Math.max(0, 2.76 - sectorMora) * 2.2 : 0;
      return signal(positives, negatives, 62 + pbi * 1.2 + moraBonus - moraPenalty + ctx.incomeGrowth * 0.9 - Math.max(0, ctx.marketStress - 25) * 0.6);
    },
  },
  {
    id: "eecc",
    name: "EECC",
    weights: [0.445, 0.445, 0.415],
    items: [
      "Liquidez corriente",
      "Liquidez acida",
      "Ciclo de conversion de efectivo",
      "Inventarios / Ventas",
      "Endeudamiento",
      "Deuda financiera CP / EBITDA",
      "Deuda financiera LP / EBITDA",
      "Cobertura intereses",
      "Deuda CP / deuda total",
      "CFO/DF",
      "CFO/EBITDA",
      "Margen operativo",
      "Margen neto",
      "Contingencias",
      "Exposicion neta moneda extranjera",
      "Partes relacionadas",
      "Hechos posteriores",
      "Variacion EBITDA",
      "Variacion ventas",
      "Ventas post-cierre",
    ],
    evaluate: (ctx) => {
      const r = ctx.ratios;
      const positives = [];
      const negatives = [];
      if (r.currentRatio > 2) positives.push("Liquidez corriente mayor a 2");
      if (r.currentRatio < 1) negatives.push("Liquidez corriente menor a 1");
      if (r.leverage < 2.5) positives.push("Endeudamiento menor a 2,5x");
      if (r.leverage > 5) negatives.push("Endeudamiento mayor a 5x");
      if (r.interestCoverage > 5) positives.push("Cobertura de intereses mayor a 5x");
      if (r.interestCoverage < 1.8) negatives.push("Cobertura de intereses menor a 1,8x");
      if (r.ebitdaMargin > 15) positives.push("Margen operativo mayor a 15%");
      if (r.ebitdaMargin < 5) negatives.push("Margen operativo menor a 5%");
      if (ctx.incomeGrowth > 0) positives.push("Variacion de ventas creciente");
      if (ctx.incomeGrowth < 0) negatives.push("Variacion de ventas decreciente");
      if (ctx.debtGrowth > ctx.incomeGrowth + 12) negatives.push("Deuda crece por encima de ventas");
      if (ctx.debtGrowth < 0) positives.push("Desendeudamiento proyectado");

      const score =
        52 +
        clamp(2.5 - r.leverage, -4, 4) * 8 +
        clamp(r.interestCoverage - 2.2, -3, 5) * 5 +
        clamp(r.currentRatio - 1, -1, 2.5) * 7 +
        clamp(r.ebitdaMargin - 10, -10, 20) * 0.9 +
        ctx.incomeGrowth * 0.5 -
        Math.max(0, ctx.debtGrowth - ctx.incomeGrowth) * 0.45;

      return signal(positives, negatives, score);
    },
  },
  {
    id: "inflacion",
    name: "Inflacion y precios",
    weights: [0.11, 0.09, 0.09],
    items: ["IPC", "Variacion salarial", "Tipo de cambio"],
    evaluate: (ctx) => {
      const positives = [];
      const negatives = [];
      if (ctx.ratios.ebitdaMargin >= 15 && ctx.incomeGrowth > 0) positives.push("Precios absorben costos e inflacion");
      if (ctx.ratios.ebitdaMargin < 8) negatives.push("Margen insuficiente para absorber costos");
      if (ctx.marketStress <= 24) positives.push("Inflacion/tipo de cambio sin presion dominante");
      if (ctx.marketStress >= 34) negatives.push("Inflacion, salarios o tipo de cambio presionan margen");
      return signal(positives, negatives, 66 + (ctx.ratios.ebitdaMargin - 12) * 1.2 - Math.max(0, ctx.marketStress - 26) * 0.75);
    },
  },
  {
    id: "tasas",
    name: "Tasas y financiamiento",
    weights: [0.04, 0.05, 0.06],
    items: ["Tasa de politica monetaria", "Riesgo pais"],
    evaluate: (ctx) => {
      const positives = [];
      const negatives = [];
      const macro = ctx.external?.macro;
      if (macro?.policyRate2026 && macro?.inflation12m && macro.policyRate2026 <= macro.inflation12m) {
        positives.push("Tasa de politica por debajo de inflacion esperada");
      }
      if (macro?.countryRiskLatest && macro?.countryRiskAverage && macro.countryRiskLatest < macro.countryRiskAverage) {
        positives.push("Riesgo pais debajo del promedio anual");
      }
      if (ctx.marketStress <= 22) positives.push("Tasa anual no supera significativamente inflacion esperada");
      if (ctx.marketStress >= 32) negatives.push("Costo financiero supera umbral de stress");
      if (ctx.ratios.interestCoverage > 5) positives.push("Cobertura financiera holgada");
      if (ctx.ratios.interestCoverage < 1.8) negatives.push("Cobertura sensible a tasas");
      const macroBonus = macro?.countryRiskLatest < macro?.countryRiskAverage ? 3 : 0;
      return signal(positives, negatives, 72 + macroBonus - ctx.marketStress * 0.9 + clamp(ctx.ratios.interestCoverage - 2, -2, 6) * 4);
    },
  },
  {
    id: "microindustria",
    name: "Microindustria",
    weights: [0.2, 0.2, 0.2],
    items: [
      "Market share estimado",
      "Cantidad competidores",
      "Entrada nuevos jugadores",
      "Variacion precios competidores",
      "Elasticidad",
      "Sustitutos",
      "Dependencia proveedores",
      "Concentracion clientes",
      "Riesgo importacion",
      "Cambios normativos",
      "Aranceles",
      "Impuestos",
      "Riesgo politico sectorial",
    ],
    evaluate: (ctx) => {
      const positives = [];
      const negatives = [];
      const sectorRisk = ctx.issuer.stress.marketSensitivity + Math.max(0, ctx.marketStress - 25) * 0.45;
      if (ctx.incomeGrowth > 8) positives.push("Demanda/market share inferido favorable");
      if (ctx.incomeGrowth < -4) negatives.push("Elasticidad o sustitutos afectan ventas");
      if (sectorRisk <= 12) positives.push("Riesgo sectorial acotado");
      if (sectorRisk >= 18) negatives.push("Microindustria expuesta a cambios de entorno");
      return signal(positives, negatives, 68 + ctx.incomeGrowth * 0.45 - sectorRisk * 1.25);
    },
  },
  {
    id: "calificacion",
    name: "Empresas con calificacion",
    weights: [0.055, 0.055, 0.07],
    items: ["Analisis FIX, Moody's, Evaluadora Latinoamericana"],
    evaluate: (ctx) => {
      const positives = [];
      const negatives = [];
      const rating = ctx.external?.rating;
      const ratingBase = ratingScore(rating?.issuerRating);
      if (rating?.issuerRating) positives.push(`Rating observado ${rating.issuerRating}`);
      if (rating?.perspective?.toLowerCase().includes("estable")) positives.push("Perspectiva estable");
      if (rating?.defaultSignal) negatives.push("Senal de default/incumplimiento informada por calificadora");
      if (ctx.ratios.leverage <= 2.5 && ctx.ratios.interestCoverage >= 3) positives.push("Perfil compatible con perspectiva estable");
      if (ctx.ratios.leverage > 5 || ctx.ratios.interestCoverage < 1.8) negatives.push("Perfil financiero compatible con watch negativo");
      return signal(
        positives,
        negatives,
        ratingBase + clamp(3 - ctx.ratios.leverage, -4, 3) * 2.5 + clamp(ctx.ratios.interestCoverage - 2, -2, 5) * 1.6
      );
    },
  },
  {
    id: "nosis",
    name: "Informacion Nosis",
    weights: [0.05, 0.06, 0.07],
    items: [
      "Score Nosis",
      "Antecedentes situacion 1, 2 o mas",
      "Aportes patronales",
      "Compromisos mensuales",
      "Cheques pendientes de deposito",
    ],
    evaluate: (ctx) => {
      const positives = [];
      const negatives = [];
      const nosis = ctx.external?.nosis;
      const pressure = ctx.ratios.debtEquity > 3 || ctx.ratios.currentRatio < 1;
      if (nosis?.score >= 700) positives.push(`Score Nosis ${nosis.score} mayor a 700`);
      if (nosis?.score >= 500 && nosis.score < 700) positives.push(`Score Nosis ${nosis.score} mayor a 500`);
      if (nosis?.score < 400) negatives.push(`Score Nosis ${nosis.score} menor a 400`);
      if (nosis?.situation === 1) positives.push("Situacion BCRA 1 normal");
      if (nosis?.situation && nosis.situation > 1) negatives.push(`Situacion BCRA ${nosis.situation}`);
      if (nosis?.patronales && nosis.patronales !== "ok") negatives.push(`Aportes patronales: ${nosis.patronales}`);
      if (nosis?.pendingChecks > 0) negatives.push(`Cheques pendientes ${nosis.pendingChecks} MM`);
      if (!pressure && ctx.marketStress < 30) positives.push("Sin presion financiera dura desde EECC");
      if (pressure) negatives.push("Presion financiera asimilable a antecedentes o compromisos crecientes");
      if (ctx.debtGrowth > 18) negatives.push("Compromisos mensuales proyectados por encima del promedio");
      return signal(
        positives,
        negatives,
        nosisScore(nosis) - (pressure ? 8 : 0) - Math.max(0, ctx.debtGrowth - 12) * 0.35 - Math.max(0, ctx.marketStress - 30) * 0.25
      );
    },
  },
];

const state = {
  issuer: issuers[0],
  incomeGrowth: 0,
  debtGrowth: 0,
  fundingStress: 0,
  baseInputs: { incomeGrowth: 0, debtGrowth: 0, fundingStress: 0 },
  shocks: { incomeGrowth: 0, debtGrowth: 0, fundingStress: 0 },
  incomeVolatility: 0,
  debtVolatility: 0,
  stressVolatility: 0,
  analystBias: 0,
};

const scenarioMatrix = [
  {
    id: "base",
    name: "Base",
    probability: 0.34,
    shocks: { incomeGrowth: 0, debtGrowth: 0, fundingStress: 0 },
    drift: [0, 0, 0],
  },
  {
    id: "recuperacion",
    name: "Recuperacion operativa",
    probability: 0.16,
    shocks: { incomeGrowth: 8, debtGrowth: -8, fundingStress: -5 },
    drift: [1, 2, 3],
  },
  {
    id: "stress_moderado",
    name: "Stress moderado",
    probability: 0.22,
    shocks: { incomeGrowth: -6, debtGrowth: 8, fundingStress: 7 },
    drift: [-1, -2, -3],
  },
  {
    id: "caida_ventas",
    name: "Caida de ventas",
    probability: 0.12,
    shocks: { incomeGrowth: -14, debtGrowth: 4, fundingStress: 5 },
    drift: [-2, -4, -5],
  },
  {
    id: "reperfilamiento",
    name: "Reperfilamiento / deuda alta",
    probability: 0.1,
    shocks: { incomeGrowth: -2, debtGrowth: 18, fundingStress: 10 },
    drift: [-1, -3, -5],
  },
  {
    id: "stress_severo",
    name: "Stress severo",
    probability: 0.06,
    shocks: { incomeGrowth: -18, debtGrowth: 22, fundingStress: 18 },
    drift: [-3, -6, -8],
  },
];

const els = {
  issuerSelect: document.querySelector("#issuerSelect"),
  companyTitle: document.querySelector("#companyTitle"),
  sourceNotes: document.querySelector("#sourceNotes"),
  dataQuality: document.querySelector("#dataQuality"),
  financialTable: document.querySelector("#financialTable"),
  ratiosTable: document.querySelector("#ratiosTable"),
  currentScore: document.querySelector("#currentScore"),
  currentScoreLabel: document.querySelector("#currentScoreLabel"),
  projectedScore: document.querySelector("#projectedScore"),
  projectedScoreLabel: document.querySelector("#projectedScoreLabel"),
  expectedDrift: document.querySelector("#expectedDrift"),
  feasibilityScore: document.querySelector("#feasibilityScore"),
  feasibilityLabel: document.querySelector("#feasibilityLabel"),
  breachProbability: document.querySelector("#breachProbability"),
  confidenceRange: document.querySelector("#confidenceRange"),
  riskStatus: document.querySelector("#riskStatus"),
  riskBadge: document.querySelector("#riskBadge"),
  riskTitle: document.querySelector("#riskTitle"),
  riskText: document.querySelector("#riskText"),
  prescriptionList: document.querySelector("#prescriptionList"),
  validationText: document.querySelector("#validationText"),
  biasText: document.querySelector("#biasText"),
  confidenceFill: document.querySelector("#confidenceFill"),
  incomeGrowth: document.querySelector("#incomeGrowth"),
  debtGrowth: document.querySelector("#debtGrowth"),
  fundingStress: document.querySelector("#marketRisk"),
  incomeVolatility: document.querySelector("#incomeVolatility"),
  debtVolatility: document.querySelector("#debtVolatility"),
  stressVolatility: document.querySelector("#marketVolatility"),
  analystBias: document.querySelector("#analystBias"),
  incomeGrowthValue: document.querySelector("#incomeGrowthValue"),
  debtGrowthValue: document.querySelector("#debtGrowthValue"),
  fundingStressValue: document.querySelector("#marketRiskValue"),
  incomeVolatilityValue: document.querySelector("#incomeVolatilityValue"),
  debtVolatilityValue: document.querySelector("#debtVolatilityValue"),
  stressVolatilityValue: document.querySelector("#marketVolatilityValue"),
  analystBiasValue: document.querySelector("#analystBiasValue"),
  engineTable: document.querySelector("#engineTable"),
  timeline: document.querySelector("#timeline"),
  temporalScore: document.querySelector("#temporalScore"),
  dimensionGrid: document.querySelector("#dimensionGrid"),
  temporalMovement: document.querySelector("#temporalMovement"),
  temporalMovementText: document.querySelector("#temporalMovementText"),
  temporalProfile: document.querySelector("#temporalProfile"),
  temporalProfileText: document.querySelector("#temporalProfileText"),
  temporalExpectation: document.querySelector("#temporalExpectation"),
  temporalExpectationText: document.querySelector("#temporalExpectationText"),
  resetBtn: document.querySelector("#resetBtn"),
  exportBtn: document.querySelector("#exportBtn"),
  chart: document.querySelector("#projectionChart"),
  gaussChart: document.querySelector("#gaussChart"),
  radarCanvas: document.querySelector("#radarCanvas"),
  temporalTimeline: document.querySelector("#temporalTimeline"),
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function pct(value) {
  return `${Math.round(value)}%`;
}

function signedPct(value) {
  return `${value > 0 ? "+" : ""}${Math.round(value)}%`;
}

function signedNumber(value) {
  return `${value > 0 ? "+" : ""}${Math.round(value)}`;
}

function money(value) {
  return value.toLocaleString("es-AR", { maximumFractionDigits: 0 });
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function yoy(values) {
  const growth = [];
  for (let index = 1; index < values.length; index += 1) {
    growth.push(((values[index] / values[index - 1]) - 1) * 100);
  }
  return growth;
}

function scoreLabel(score) {
  if (score >= 68) return "Flujo seguro";
  if (score >= 55) return "Observacion";
  return "Riesgo elevado";
}

function ratingScore(rating = "") {
  const normalized = rating.toUpperCase().replace(/\(.*?\)/g, "").trim();
  if (normalized.includes("AAA")) return 94;
  if (normalized.includes("AA")) return 88;
  if (/^A/.test(normalized)) return 78;
  if (normalized.includes("BBB")) return 66;
  if (normalized.includes("BB")) return 54;
  if (/^B/.test(normalized)) return 42;
  if (normalized.includes("CCC")) return 28;
  if (normalized.includes("CC")) return 22;
  if (/^C/.test(normalized)) return 18;
  if (/^D/.test(normalized)) return 8;
  return 58;
}

function nosisScore(nosis) {
  if (!nosis) return 58;
  if (nosis.situation && nosis.situation > 1) return clamp(62 - nosis.situation * 10, 8, 62);
  if (nosis.score >= 700) return 88;
  if (nosis.score >= 500) return 68;
  if (nosis.score >= 400) return 52;
  return 18;
}

function latestFinancial() {
  return state.issuer.financials.at(-1);
}

function calculateFinancialRatios(financial = latestFinancial()) {
  const netDebt = Math.max(0, financial.debt - financial.cash);
  const ebitdaMargin = (financial.ebitda / Math.max(financial.revenue, 1)) * 100;
  const leverage = netDebt / Math.max(financial.ebitda, 1);
  const interestCoverage = financial.ebitda / Math.max(financial.interest, 1);
  const currentRatio = financial.currentAssets / Math.max(financial.currentLiabilities, 1);
  const debtEquity = financial.debt / Math.max(financial.equity, 1);

  return { netDebt, ebitdaMargin, leverage, interestCoverage, currentRatio, debtEquity };
}

function signal(positives, negatives, baseScore) {
  const score = clamp(baseScore + positives.length * 3 - negatives.length * 5, 5, 98);
  return {
    score,
    positives,
    negatives,
    tone: score >= 68 ? "positive" : score >= 55 ? "neutral" : "negative",
  };
}

function buildContext(incomeGrowth, debtGrowth, marketStress, yearIndex = 0) {
  const latest = latestFinancial();
  const latestRatios = calculateFinancialRatios(latest);
  const revenue = latest.revenue * (1 + incomeGrowth / 100) ** yearIndex;
  const debt = latest.debt * (1 + debtGrowth / 100) ** yearIndex;
  const cash = latest.cash * (1 + Math.max(-5, incomeGrowth * 0.45) / 100) ** yearIndex;
  const ebitdaMargin = clamp(
    latestRatios.ebitdaMargin + state.analystBias * 0.12 - Math.max(0, marketStress - state.issuer.stress.fundingCost) * 0.03 - yearIndex * 0.15,
    3,
    35
  );
  const ebitda = revenue * (ebitdaMargin / 100);
  const interest = debt * clamp((marketStress + state.issuer.stress.refinancingPressure) / 100, 0.06, 0.55);
  const equity = latest.equity * (1 + Math.max(-4, incomeGrowth * 0.35) / 100) ** yearIndex;
  const currentAssets = latest.currentAssets * (1 + incomeGrowth / 140) ** yearIndex;
  const currentLiabilities = latest.currentLiabilities * (1 + Math.max(0, debtGrowth) / 115) ** yearIndex;
  const financial = { revenue, ebitda, debt, cash, equity, interest, currentAssets, currentLiabilities };

  return {
    issuer: state.issuer,
    external: externalInputs[state.issuer.id],
    financial,
    ratios: calculateFinancialRatios(financial),
    incomeGrowth,
    debtGrowth,
    marketStress,
    yearIndex,
  };
}

function evaluateDriverModel(incomeGrowth, debtGrowth, marketStress, yearIndex = 0) {
  const ctx = buildContext(incomeGrowth, debtGrowth, marketStress, yearIndex);
  const categoryResults = driverCategories.map((category) => {
    const result = category.evaluate(ctx);
    const weight = category.weights[Math.min(yearIndex, 2)];
    return { ...category, ...result, weight };
  });
  const totalWeight = categoryResults.reduce((sum, item) => sum + item.weight, 0);
  const weightedScore = categoryResults.reduce((sum, item) => sum + item.score * item.weight, 0) / totalWeight;
  const negativeLoad = categoryResults.reduce((sum, item) => sum + item.negatives.length * item.weight, 0);
  const positiveLoad = categoryResults.reduce((sum, item) => sum + item.positives.length * item.weight, 0);
  const score = clamp(weightedScore + (positiveLoad - negativeLoad) * 1.5, 5, 98);

  return {
    score: Math.round(score),
    categoryResults,
    context: ctx,
  };
}

function calculateHistoryScores() {
  return state.issuer.financials.map((financial, index, list) => {
    const growth = index === 0 ? 0 : ((financial.revenue / list[index - 1].revenue) - 1) * 100;
    const debtGrowth = index === 0 ? 0 : ((financial.debt / list[index - 1].debt) - 1) * 100;
    return evaluateDriverModel(growth, debtGrowth, state.issuer.stress.fundingCost, 0).score;
  });
}

function deriveInputsFromFinancials() {
  const financials = state.issuer.financials;
  const revenues = financials.map((item) => item.revenue);
  const debts = financials.map((item) => item.debt);
  const margins = financials.map((item) => (item.ebitda / item.revenue) * 100);
  const revenueGrowths = yoy(revenues);
  const debtGrowths = yoy(debts);
  const leverageHistory = financials.map((item) => calculateFinancialRatios(item).leverage);
  const incomeGrowth = average(revenueGrowths);
  const debtGrowth = average(debtGrowths);
  const marginVolatility = Math.max(...margins) - Math.min(...margins);
  const leverageVolatility = Math.max(...leverageHistory) - Math.min(...leverageHistory);
  const lastGrowthGap = revenueGrowths.at(-1) - average(revenueGrowths);

  return {
    incomeGrowth: Math.round(clamp(incomeGrowth, -20, 35)),
    debtGrowth: Math.round(clamp(debtGrowth, -25, 35)),
    fundingStress: Math.round(clamp(state.issuer.stress.fundingCost + state.issuer.stress.refinancingPressure * 0.4, 5, 45)),
    incomeVolatility: Math.round(clamp(2 + marginVolatility + Math.abs(lastGrowthGap) * 0.25, 1, 12)),
    debtVolatility: Math.round(clamp(2 + leverageVolatility * 2 + Math.abs(debtGrowth) * 0.18, 1, 14)),
    stressVolatility: Math.round(clamp(state.issuer.stress.marketSensitivity, 1, 16)),
    analystBias: Math.round(clamp(lastGrowthGap * 0.22 - Math.max(0, debtGrowth - incomeGrowth) * 0.12, -10, 10)),
  };
}

function applyShockInputs() {
  state.incomeGrowth = state.baseInputs.incomeGrowth + state.shocks.incomeGrowth;
  state.debtGrowth = state.baseInputs.debtGrowth + state.shocks.debtGrowth;
  state.fundingStress = state.baseInputs.fundingStress + state.shocks.fundingStress;
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function normalSample(mean, deviation, seed) {
  const u1 = Math.max(seededRandom(seed), 0.0001);
  const u2 = Math.max(seededRandom(seed + 1.37), 0.0001);
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + z * deviation;
}

function percentile(values, percent) {
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.floor((sorted.length - 1) * percent);
  return sorted[index];
}

function calculateScenario(incomeGrowth, debtGrowth, fundingStress) {
  const current = evaluateDriverModel(incomeGrowth, debtGrowth, fundingStress, 0).score;
  const result = [current];

  for (let year = 1; year <= 3; year += 1) {
    const horizonGrowth = incomeGrowth - year * 0.35;
    const horizonDebt = debtGrowth + Math.max(0, fundingStress - 28) * 0.08 * year;
    const horizonStress = fundingStress + year * 0.6;
    result.push(evaluateDriverModel(horizonGrowth, horizonDebt, horizonStress, year - 1).score);
  }

  return result;
}

function calculateDiscreteScenario(definition, incomeGrowth, debtGrowth, fundingStress) {
  const result = [evaluateDriverModel(incomeGrowth, debtGrowth, fundingStress, 0).score];

  for (let year = 1; year <= 3; year += 1) {
    const progressive = year / 3;
    const scenarioIncome =
      incomeGrowth + definition.shocks.incomeGrowth * progressive + definition.drift[year - 1];
    const scenarioDebt =
      debtGrowth + definition.shocks.debtGrowth * progressive + Math.max(0, fundingStress - 28) * 0.06 * year;
    const scenarioStress =
      fundingStress + definition.shocks.fundingStress * progressive + year * 0.4;
    result.push(evaluateDriverModel(scenarioIncome, scenarioDebt, scenarioStress, year - 1).score);
  }

  return result;
}

function calculateProbabilisticModel() {
  const runs = 5000;
  const yearly = [[], [], [], []];
  const finalScores = [];
  const scenarioSummaries = [];
  let breaches = 0;
  const weightedExpected = [0, 0, 0, 0];

  scenarioMatrix.forEach((definition, scenarioIndex) => {
    const deterministic = calculateDiscreteScenario(
      definition,
      state.incomeGrowth,
      state.debtGrowth,
      state.fundingStress
    );
    deterministic.forEach((score, index) => {
      weightedExpected[index] += score * definition.probability;
    });
    scenarioSummaries.push({
      name: definition.name,
      probability: definition.probability,
      values: deterministic,
      finalScore: deterministic.at(-1),
    });

    const scenarioRuns = Math.max(1, Math.round(runs * definition.probability));
    for (let run = 0; run < scenarioRuns; run += 1) {
      const seed = run * 9.91 + state.issuer.id.length * 17 + scenarioIndex * 101;
      const income = normalSample(
        state.incomeGrowth + definition.shocks.incomeGrowth,
        state.incomeVolatility * 0.45,
        seed
      );
      const debt = normalSample(
        state.debtGrowth + definition.shocks.debtGrowth,
        state.debtVolatility * 0.45,
        seed + 11
      );
      const stress = normalSample(
        state.fundingStress + definition.shocks.fundingStress,
        state.stressVolatility * 0.45,
        seed + 23
      );
      const scenario = calculateScenario(income, debt, stress);

      scenario.forEach((score, index) => yearly[index].push(score));
      const finalScore = scenario.at(-1);
      finalScores.push(finalScore);
      if (finalScore < 68) breaches += 1;
    }
  });

  const expected = weightedExpected.map((score) => Math.round(score));
  const p10 = yearly.map((scores) => Math.round(percentile(scores, 0.1)));
  const p90 = yearly.map((scores) => Math.round(percentile(scores, 0.9)));

  return {
    expected,
    p10,
    p90,
    finalScores,
    scenarioSummaries,
    breachProbability: Math.round((breaches / finalScores.length) * 100),
    finalMean: expected.at(-1),
    finalP10: p10.at(-1),
    finalP90: p90.at(-1),
  };
}

function getDiagnosis(values, model) {
  const finalScore = values.at(-1);
  const minimum = Math.min(...values);
  if (minimum < 55 || model.breachProbability >= 55) {
    return {
      tone: "danger",
      badge: "Alerta temprana",
      title: "El caso tensiona el andarivel",
      text: "La matriz de drivers activa senales negativas suficientes para elevar la probabilidad de ruptura del flujo seguro.",
    };
  }
  if (finalScore < 68 || model.breachProbability >= 25) {
    return {
      tone: "watch",
      badge: "En observacion",
      title: "La aptitud depende de ejecucion operativa",
      text: "El score medio es defendible, pero EECC, tasas y microindustria exigen seguimiento.",
    };
  }
  return {
    tone: "safe",
    badge: "Apto",
    title: "El emisor permanece dentro de flujo seguro",
    text: "Los drivers ponderados sostienen una lectura positiva bajo la simulacion probabilistica.",
  };
}

function getPrescriptions(currentModel, model) {
  const finalScore = model.expected.at(-1);
  const critical = [...currentModel.categoryResults]
    .sort((a, b) => (b.weight * (100 - b.score)) - (a.weight * (100 - a.score)))
    .slice(0, 3);

  if (finalScore >= 68 && model.breachProbability < 25) {
    return critical.slice(0, 2).map((item) => [
      `Monitorear ${item.name}`,
      item.negatives[0] || item.positives[0] || `Categoria ponderada ${(item.weight * 100).toFixed(1)}%.`,
    ]);
  }

  return critical.map((item) => [
    `Corregir ${item.name}`,
    item.negatives[0] || `Elevar score de categoria desde ${Math.round(item.score)} puntos.`,
  ]);
}

function getFeasibility(currentModel, finalScore) {
  const ratios = calculateFinancialRatios();
  const negativeWeight = currentModel.categoryResults
    .filter((item) => item.score < 55)
    .reduce((sum, item) => sum + item.weight, 0);
  return Math.round(clamp(92 - Math.max(0, 68 - finalScore) * 2.2 - Math.max(0, ratios.leverage - 2.5) * 9 - negativeWeight * 28, 18, 95));
}

function getMostRelevantRiskScenario(model) {
  return [...model.scenarioSummaries].sort((a, b) => {
    const riskA = Math.max(0, 68 - a.finalScore) * a.probability;
    const riskB = Math.max(0, 68 - b.finalScore) * b.probability;
    return riskB - riskA;
  })[0];
}

function categoryScore(result, id) {
  return result.categoryResults.find((item) => item.id === id)?.score ?? 55;
}

function temporalDimensionsFromModel(result) {
  const r = result.context.ratios;
  const patrimonio = clamp(
    categoryScore(result, "eecc") * 0.42 +
      categoryScore(result, "calificacion") * 0.28 +
      categoryScore(result, "nosis") * 0.18 +
      clamp(72 - r.debtEquity * 6, 5, 98) * 0.12,
    5,
    98
  );
  const liquidez = clamp(
    categoryScore(result, "eecc") * 0.48 +
      categoryScore(result, "tasas") * 0.24 +
      categoryScore(result, "nosis") * 0.16 +
      clamp(45 + r.currentRatio * 18 + r.interestCoverage * 3, 5, 98) * 0.12,
    5,
    98
  );
  const rentabilidad = clamp(
    categoryScore(result, "eecc") * 0.34 +
      categoryScore(result, "actividad") * 0.22 +
      categoryScore(result, "inflacion") * 0.2 +
      categoryScore(result, "microindustria") * 0.14 +
      clamp(42 + r.ebitdaMargin * 1.45, 5, 98) * 0.1,
    5,
    98
  );

  return [Math.round(patrimonio), Math.round(liquidez), Math.round(rentabilidad)];
}

function buildTemporalModel(model) {
  const history = state.issuer.financials.map((financial, index, list) => {
    const incomeGrowth = index === 0 ? 0 : ((financial.revenue / list[index - 1].revenue) - 1) * 100;
    const debtGrowth = index === 0 ? 0 : ((financial.debt / list[index - 1].debt) - 1) * 100;
    const result = evaluateDriverModel(incomeGrowth, debtGrowth, state.issuer.stress.fundingCost, 0);
    return { label: String(financial.year), values: temporalDimensionsFromModel(result) };
  });
  const currentResult = evaluateDriverModel(state.incomeGrowth, state.debtGrowth, state.fundingStress, 0);
  const projectedResult = evaluateDriverModel(
    state.incomeGrowth - 1,
    state.debtGrowth + Math.max(0, state.fundingStress - 28) * 0.2,
    state.fundingStress + 2,
    2
  );
  const current = temporalDimensionsFromModel(currentResult);
  const previous = history.at(-2)?.values ?? history.at(-1)?.values ?? current;
  const projected = temporalDimensionsFromModel(projectedResult);
  const benchmark = [
    Math.round(clamp(62 - state.issuer.stress.refinancingPressure * 0.5, 48, 72)),
    Math.round(clamp(60 - state.issuer.stress.fundingCost * 0.2, 48, 70)),
    Math.round(clamp(58 - state.issuer.stress.marketSensitivity * 0.35, 46, 68)),
  ];

  return {
    labels: ["Patrimonio", "Liquidez", "Rentabilidad"],
    history: [...history.slice(0, -1), { label: "Actual", values: current }],
    previous,
    current,
    projected,
    benchmark,
    score: Math.round(average(current)),
    projectedScore: Math.round(average(projected)),
    riskScenario: getMostRelevantRiskScenario(model),
  };
}

function colorForDelta(delta) {
  if (delta > 5) return "#1f8a5b";
  if (delta >= 0) return "#2f6b9f";
  if (delta >= -5) return "#bc7a0f";
  return "#b33a3a";
}

function movementLabel(delta) {
  if (delta > 8) return "Expansion";
  if (delta > 1) return "Mejora";
  if (delta >= -1) return "Estable";
  if (delta >= -8) return "Retroceso";
  return "Contraccion";
}

function drawTemporalRadar(temporal) {
  const canvas = els.radarCanvas;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const cx = width / 2;
  const cy = height / 2 + 8;
  const radius = Math.min(width, height) * 0.34;
  const angles = [-Math.PI / 2, -Math.PI / 2 + (Math.PI * 2) / 3, -Math.PI / 2 + (Math.PI * 4) / 3];

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  [0.25, 0.5, 0.75, 1].forEach((step) => {
    ctx.beginPath();
    angles.forEach((angle, index) => {
      const x = cx + Math.cos(angle) * radius * step;
      const y = cy + Math.sin(angle) * radius * step;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.strokeStyle = "#d9e0dd";
    ctx.stroke();
  });

  angles.forEach((angle) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    ctx.strokeStyle = "#d9e0dd";
    ctx.stroke();
  });

  const polygon = (values, color, options = {}) => {
    const { dash = [], alpha = 1, width = 2, fill = false, fillAlpha = "16" } = options;
    ctx.beginPath();
    values.forEach((value, index) => {
      const x = cx + Math.cos(angles[index]) * radius * (value / 100);
      const y = cy + Math.sin(angles[index]) * radius * (value / 100);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = `${color}${fillAlpha}`;
      ctx.fill();
    }
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.setLineDash(dash);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  };

  polygon(temporal.benchmark, "#13211f", { dash: [2, 6], alpha: 0.42, width: 2 });
  polygon(temporal.previous, "#8fa8b9", { alpha: 0.65, width: 2 });
  polygon(temporal.projected, "#1f8a5b", { dash: [7, 5], alpha: 0.9, width: 2.5 });
  polygon(temporal.current, "#2f6b9f", { alpha: 1, width: 3, fill: true, fillAlpha: "18" });

  temporal.current.forEach((value, index) => {
    const x = cx + Math.cos(angles[index]) * radius * (value / 100);
    const y = cy + Math.sin(angles[index]) * radius * (value / 100);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#2f6b9f";
    ctx.fill();
  });

  ctx.fillStyle = "#66716f";
  ctx.font = "700 13px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  temporal.labels.forEach((label, index) => {
    const x = cx + Math.cos(angles[index]) * (radius + 34);
    const y = cy + Math.sin(angles[index]) * (radius + 30);
    ctx.fillText(label, x, y + 4);
  });
  ctx.textAlign = "left";
}

function drawTemporalTimeline(temporal) {
  const canvas = els.temporalTimeline;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const pad = { left: 42, right: 24, top: 20, bottom: 30 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const points = [...temporal.history, { label: "Proy.", values: temporal.projected, future: true }];
  const colors = ["#2f6b9f", "#534ab7", "#d85a30"];
  const xFor = (index) => pad.left + (chartW / Math.max(1, points.length - 1)) * index;
  const yFor = (value) => pad.top + (100 - value) * (chartH / 100);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  [25, 50, 75, 100].forEach((value) => {
    const y = yFor(value);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.strokeStyle = "#edf1ef";
    ctx.stroke();
    ctx.fillStyle = "#66716f";
    ctx.font = "11px Inter, system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(value, pad.left - 8, y + 4);
  });

  temporal.labels.forEach((label, dimIndex) => {
    ctx.beginPath();
    points.forEach((point, index) => {
      const x = xFor(index);
      const y = yFor(point.values[dimIndex]);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = colors[dimIndex];
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  points.forEach((point, index) => {
    ctx.fillStyle = point.future ? "#1f8a5b" : "#66716f";
    ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(point.label, xFor(index), height - 10);
  });

  ctx.textAlign = "left";
  temporal.labels.forEach((label, index) => {
    ctx.fillStyle = colors[index];
    ctx.font = "700 12px Inter, system-ui, sans-serif";
    ctx.fillText(`Dimension: ${label}`, pad.left + index * 142, 12);
  });
}

function renderTemporalView(model) {
  const temporal = buildTemporalModel(model);
  const dimensionColors = ["#2f6b9f", "#534ab7", "#d85a30"];
  const delta = Math.round(average(temporal.current) - average(temporal.previous));
  const expectedDelta = temporal.projectedScore - temporal.score;
  const gaps = temporal.current.map((value, index) => value - temporal.benchmark[index]);
  const best = gaps.indexOf(Math.max(...gaps));
  const worst = gaps.indexOf(Math.min(...gaps));

  els.temporalScore.textContent = `Score temporal ${temporal.score}/100`;
  els.dimensionGrid.innerHTML = temporal.labels
    .map((label, index) => {
      const dimDelta = temporal.current[index] - temporal.previous[index];
      return `
        <div class="dimension-card">
          <div class="dimension-top">
            <span>${label}</span>
            <strong style="color:${colorForDelta(dimDelta)}">${dimDelta >= 0 ? "+" : ""}${dimDelta} pts</strong>
          </div>
          <div class="dimension-bar">
            <i class="previous" style="width:${temporal.previous[index]}%"></i>
            <i class="current" style="width:${temporal.current[index]}%; background:${dimensionColors[index]}"></i>
            <i class="projected" style="width:${temporal.projected[index]}%"></i>
            <i class="benchmark" style="left:${temporal.benchmark[index]}%"></i>
          </div>
          <div class="dimension-values">
            <span><i class="ref-current"></i>Act. ${temporal.current[index]}</span>
            <span><i class="ref-prev"></i>Ant. ${temporal.previous[index]}</span>
            <span><i class="ref-proj"></i>Proy. ${temporal.projected[index]}</span>
            <span><i class="ref-bench"></i>Bench. ${temporal.benchmark[index]}</span>
          </div>
        </div>
      `;
    })
    .join("");

  els.temporalMovement.textContent = movementLabel(delta);
  els.temporalMovement.style.color = colorForDelta(delta);
  els.temporalMovementText.textContent = `${delta >= 0 ? "+" : ""}${delta} pts promedio contra el periodo anterior.`;
  els.temporalProfile.textContent = gaps.every((gap) => gap >= 0)
    ? "Perfil balanceado"
    : gaps.every((gap) => gap < 0)
      ? "Perfil vulnerable"
      : `Perfil ${temporal.labels[best].toLowerCase()}`;
  els.temporalProfileText.textContent = `Fortaleza relativa en ${temporal.labels[best].toLowerCase()} y brecha principal en ${temporal.labels[worst].toLowerCase()}.`;
  els.temporalExpectation.textContent = expectedDelta >= 2
    ? "Mejora esperada"
    : expectedDelta <= -2
      ? "Presion esperada"
      : "Continuidad";
  els.temporalExpectation.style.color = colorForDelta(expectedDelta);
  els.temporalExpectationText.textContent = `${expectedDelta >= 0 ? "+" : ""}${expectedDelta} pts promedio. Escenario clave: ${temporal.riskScenario.name}.`;

  drawTemporalRadar(temporal);
  drawTemporalTimeline(temporal);
}

function drawChart(model) {
  const values = model.expected;
  const canvas = els.chart;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const pad = { left: 56, right: 24, top: 26, bottom: 54 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const xFor = (index) => pad.left + (chartW / 3) * index;
  const yFor = (score) => pad.top + (100 - clamp(score, 0, 100)) * (chartH / 100);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#dff3ea";
  ctx.fillRect(pad.left, yFor(100), chartW, yFor(68) - yFor(100));
  ctx.fillStyle = "#fbecd1";
  ctx.fillRect(pad.left, yFor(68), chartW, yFor(55) - yFor(68));
  ctx.fillStyle = "#f7dede";
  ctx.fillRect(pad.left, yFor(55), chartW, yFor(0) - yFor(55));
  ctx.fillStyle = "rgba(47, 107, 159, 0.15)";
  ctx.beginPath();
  model.p90.forEach((score, index) => {
    if (index === 0) ctx.moveTo(xFor(index), yFor(score));
    else ctx.lineTo(xFor(index), yFor(score));
  });
  [...model.p10].reverse().forEach((score, reverseIndex) => {
    const index = model.p10.length - 1 - reverseIndex;
    ctx.lineTo(xFor(index), yFor(score));
  });
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#d5dfdb";
  ctx.lineWidth = 1;
  [0, 30, 45, 55, 68, 85, 100].forEach((score) => {
    const y = yFor(score);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    ctx.fillStyle = "#66716f";
    ctx.font = "13px Inter, system-ui, sans-serif";
    ctx.fillText(score, 18, y + 4);
  });
  ctx.strokeStyle = "#2f6b9f";
  ctx.lineWidth = 4;
  ctx.beginPath();
  values.forEach((score, index) => {
    if (index === 0) ctx.moveTo(xFor(index), yFor(score));
    else ctx.lineTo(xFor(index), yFor(score));
  });
  ctx.stroke();
  values.forEach((score, index) => {
    const x = xFor(index);
    const y = yFor(score);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#2f6b9f";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "#13211f";
    ctx.font = "700 14px Inter, system-ui, sans-serif";
    ctx.fillText(score, x - 9, y - 16);
  });
  ["Actual", "Ano 1", "Ano 2", "Ano 3"].forEach((label, index) => {
    ctx.fillStyle = "#66716f";
    ctx.font = "13px Inter, system-ui, sans-serif";
    ctx.fillText(label, xFor(index) - 18, height - 24);
  });
}

function drawGaussChart(model) {
  const canvas = els.gaussChart;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const pad = { left: 38, right: 30, top: 22, bottom: 40 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const mean = model.finalMean;
  const variance = model.finalScores.reduce((sum, score) => sum + (score - mean) ** 2, 0) / model.finalScores.length;
  const deviation = Math.max(3, Math.sqrt(variance));
  const min = Math.max(0, Math.floor(mean - deviation * 3));
  const max = Math.min(100, Math.ceil(mean + deviation * 3));
  const yBase = height - pad.bottom;
  const xFor = (score) => pad.left + ((score - min) / Math.max(1, max - min)) * chartW;
  const yFor = (value) => yBase - value * chartH * 0.92;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "rgba(179, 58, 58, 0.12)";
  ctx.fillRect(pad.left, pad.top, Math.max(0, xFor(68) - pad.left), chartH);
  ctx.strokeStyle = "#2f6b9f";
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let step = 0; step <= 120; step += 1) {
    const score = min + ((max - min) / 120) * step;
    const exponent = -0.5 * ((score - mean) / deviation) ** 2;
    const y = yFor(Math.exp(exponent));
    if (step === 0) ctx.moveTo(xFor(score), y);
    else ctx.lineTo(xFor(score), y);
  }
  ctx.stroke();
  ctx.strokeStyle = "#b33a3a";
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(xFor(68), pad.top);
  ctx.lineTo(xFor(68), yBase);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#13211f";
  ctx.font = "700 14px Inter, system-ui, sans-serif";
  ctx.fillText(`Esperado ${mean}`, xFor(mean) - 38, pad.top + 18);
  ctx.fillStyle = "#66716f";
  ctx.font = "13px Inter, system-ui, sans-serif";
  ctx.fillText(`P10 ${model.finalP10}`, pad.left, height - 14);
  ctx.fillText(`P90 ${model.finalP90}`, width - pad.right - 56, height - 14);
  ctx.fillText("Piso seguro 68", xFor(68) - 42, yBase - 8);
}

function renderFinancials(currentModel) {
  const ratios = calculateFinancialRatios();
  const latest = latestFinancial();
  const byId = Object.fromEntries(currentModel.categoryResults.map((item) => [item.id, item]));
  const external = externalInputs[state.issuer.id];

  els.companyTitle.textContent = `${state.issuer.name} · ${state.issuer.sector}`;
  els.sourceNotes.textContent = `${state.issuer.source} Inputs externos: datos de testing, Nosis SAC y FIX.`;
  els.dataQuality.textContent = `${state.issuer.dataQuality} + externos`;
  els.financialTable.innerHTML = state.issuer.financials
    .map((item) => `
      <tr>
        <td>${item.year}</td>
        <td>${money(item.revenue)}</td>
        <td>${money(item.ebitda)}</td>
        <td>${money(item.debt)}</td>
        <td>${money(item.cash)}</td>
      </tr>
    `)
    .join("");

  const ratioRows = [
    ["Liquidez corriente", `${ratios.currentRatio.toFixed(1)}x`, byId.eecc.positives.find((x) => x.includes("Liquidez")) || byId.eecc.negatives.find((x) => x.includes("Liquidez")) || "Sin umbral extremo"],
    ["Endeudamiento", `${ratios.leverage.toFixed(1)}x`, byId.eecc.positives.find((x) => x.includes("Endeudamiento")) || byId.eecc.negatives.find((x) => x.includes("Endeudamiento")) || "Zona media"],
    ["Cobertura intereses", `${ratios.interestCoverage.toFixed(1)}x`, byId.eecc.positives.find((x) => x.includes("Cobertura")) || byId.eecc.negatives.find((x) => x.includes("Cobertura")) || "Zona media"],
    ["Margen operativo", pct(ratios.ebitdaMargin), byId.eecc.positives.find((x) => x.includes("Margen")) || byId.eecc.negatives.find((x) => x.includes("Margen")) || "Zona media"],
    ["Costo financiero", pct((latest.interest / latest.debt) * 100), byId.tasas.negatives[0] || byId.tasas.positives[0] || "Sin senal extrema"],
    ["Mora sectorial", `${external.sectorDefaultRate.toFixed(2)}%`, byId.actividad.negatives.find((x) => x.includes("Mora")) || byId.actividad.positives.find((x) => x.includes("Mora")) || "Sin senal extrema"],
    ["Nosis / BCRA", `${external.nosis.score} · Sit. ${external.nosis.situation}`, byId.nosis.negatives[0] || byId.nosis.positives[0] || "Sin senal extrema"],
    ["Calificadora", external.rating.issuerRating, byId.calificacion.negatives[0] || byId.calificacion.positives[0] || external.rating.detail],
  ];

  els.ratiosTable.innerHTML = ratioRows
    .map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td></tr>`)
    .join("");
}

function renderEngineTable(currentModel, values) {
  els.engineTable.innerHTML = currentModel.categoryResults
    .map((item) => {
      const signalText = item.negatives[0] || item.positives[0] || "Sin senal extrema; lectura neutral.";
      return `
        <tr>
          <td><strong>${item.name}</strong><span class="driver-note">${item.items.slice(0, 4).join(" · ")}${item.items.length > 4 ? "..." : ""}</span></td>
          <td>${item.weights.map((weight) => `${(weight * 100).toFixed(1)}%`).join(" / ")}</td>
          <td><span class="score-pill ${item.tone}">${Math.round(item.score)}</span> ${signalText}</td>
        </tr>
      `;
    })
    .join("");

  els.timeline.innerHTML = values
    .map((score, index) => {
      const label = index === 0 ? "Actual" : `Ano ${index}`;
      return `<div class="timeline-item"><strong>${label}</strong><span>${score} puntos · ${scoreLabel(score)}</span></div>`;
    })
    .join("");
}

function render() {
  const model = calculateProbabilisticModel();
  const values = model.expected;
  const current = values[0];
  const projected = values.at(-1);
  const drift = projected - current;
  const currentModel = evaluateDriverModel(state.incomeGrowth, state.debtGrowth, state.fundingStress, 0);
  const diagnosis = getDiagnosis(values, model);
  const feasibility = getFeasibility(currentModel, projected);

  els.currentScore.textContent = current;
  els.currentScoreLabel.textContent = scoreLabel(current);
  els.projectedScore.textContent = projected;
  els.projectedScoreLabel.textContent = scoreLabel(projected);
  els.expectedDrift.textContent = `${drift > 0 ? "+" : ""}${drift}`;
  els.feasibilityScore.textContent = `${feasibility}%`;
  els.feasibilityLabel.textContent = feasibility >= 70 ? "Correccion realista" : "Requiere validacion";
  els.breachProbability.textContent = `${model.breachProbability}%`;
  els.confidenceRange.textContent = `${model.finalP10}-${model.finalP90}`;
  els.riskStatus.className = `risk-status ${diagnosis.tone === "safe" ? "" : diagnosis.tone}`;
  els.riskBadge.textContent = diagnosis.badge;
  els.riskTitle.textContent = diagnosis.title;
  els.riskText.textContent = diagnosis.text;
  els.prescriptionList.innerHTML = getPrescriptions(currentModel, model)
    .map(([title, detail]) => `<div class="prescription-item"><strong>${title}</strong><span>${detail}</span></div>`)
    .join("");
  els.validationText.textContent =
    feasibility >= 70
      ? "El historial normalizado permite ejecutar correcciones razonables sobre los drivers criticos."
      : "La correccion requerida supera la capacidad historica observada; conviene reducir cupo o pedir garantias.";
  els.confidenceFill.style.width = `${feasibility}%`;
  const riskScenario = getMostRelevantRiskScenario(model);
  const biasIntro =
    state.analystBias > 0
      ? "Sesgo optimista aplicado."
      : state.analystBias < 0
        ? "Sesgo conservador aplicado."
        : "Sin sesgo direccional fuerte.";
  els.biasText.textContent =
    `${biasIntro} Escenario que mas aporta riesgo: ${riskScenario.name}, ` +
    `${Math.round(riskScenario.probability * 100)}% de probabilidad, score final ${riskScenario.finalScore}.`;
  els.incomeGrowthValue.textContent =
    `Base ${pct(state.baseInputs.incomeGrowth)} · ${signedPct(state.shocks.incomeGrowth)} · ${pct(state.incomeGrowth)}`;
  els.debtGrowthValue.textContent =
    `Base ${pct(state.baseInputs.debtGrowth)} · ${signedPct(state.shocks.debtGrowth)} · ${pct(state.debtGrowth)}`;
  els.fundingStressValue.textContent =
    `Base ${state.baseInputs.fundingStress} · ${signedNumber(state.shocks.fundingStress)} · ${Math.round(state.fundingStress)}`;
  els.incomeVolatilityValue.textContent = `${state.incomeVolatility}`;
  els.debtVolatilityValue.textContent = `${state.debtVolatility}`;
  els.stressVolatilityValue.textContent = `${state.stressVolatility}`;
  els.analystBiasValue.textContent = `${state.analystBias > 0 ? "+" : ""}${state.analystBias}`;

  drawChart(model);
  drawGaussChart(model);
  renderFinancials(currentModel);
  renderEngineTable(currentModel, values);
  renderTemporalView(model);
}

function syncStateFromIssuer() {
  const derived = deriveInputsFromFinancials();
  state.baseInputs = {
    incomeGrowth: derived.incomeGrowth,
    debtGrowth: derived.debtGrowth,
    fundingStress: derived.fundingStress,
  };
  state.shocks = { incomeGrowth: 0, debtGrowth: 0, fundingStress: 0 };
  Object.assign(state, derived);
  applyShockInputs();
}

function setIssuer(issuerId) {
  state.issuer = issuers.find((issuer) => issuer.id === issuerId) || issuers[0];
  syncStateFromIssuer();
  syncControls();
  render();
}

function syncControls() {
  els.incomeGrowth.value = state.shocks.incomeGrowth;
  els.debtGrowth.value = state.shocks.debtGrowth;
  els.fundingStress.value = state.shocks.fundingStress;
  els.incomeVolatility.value = state.incomeVolatility;
  els.debtVolatility.value = state.debtVolatility;
  els.stressVolatility.value = state.stressVolatility;
  els.analystBias.value = state.analystBias;
}

function init() {
  els.issuerSelect.innerHTML = issuers
    .map((issuer) => `<option value="${issuer.id}">${issuer.name} · ${issuer.sector}</option>`)
    .join("");

  syncStateFromIssuer();
  els.issuerSelect.addEventListener("change", (event) => setIssuer(event.target.value));
  els.incomeGrowth.addEventListener("input", (event) => {
    state.shocks.incomeGrowth = Number(event.target.value);
    applyShockInputs();
    render();
  });
  els.debtGrowth.addEventListener("input", (event) => {
    state.shocks.debtGrowth = Number(event.target.value);
    applyShockInputs();
    render();
  });
  els.fundingStress.addEventListener("input", (event) => {
    state.shocks.fundingStress = Number(event.target.value);
    applyShockInputs();
    render();
  });
  els.incomeVolatility.addEventListener("input", (event) => {
    state.incomeVolatility = Number(event.target.value);
    render();
  });
  els.debtVolatility.addEventListener("input", (event) => {
    state.debtVolatility = Number(event.target.value);
    render();
  });
  els.stressVolatility.addEventListener("input", (event) => {
    state.stressVolatility = Number(event.target.value);
    render();
  });
  els.analystBias.addEventListener("input", (event) => {
    state.analystBias = Number(event.target.value);
    render();
  });
  els.resetBtn.addEventListener("click", () => setIssuer(state.issuer.id));
  els.exportBtn.addEventListener("click", () => window.print());

  syncControls();
  render();
}

init();
