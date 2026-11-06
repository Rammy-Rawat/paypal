import { z } from "zod";

const MoneyString = z.string().trim().regex(/^\d{1,15}(?:\.\d{1,4})?$/, "Enter a positive amount using digits only.").refine((value) => Number(value) > 0, "Amount must be greater than zero.");
const Percent = z.number().finite().min(0).max(100);

export const ContractRequestSchema = z.object({
  contractText: z.string().trim().min(80, "Paste at least 80 characters of contract text.").max(60_000, "Contract text is too long (60,000 character limit)."),
  projectType: z.string().trim().max(100).optional(),
});

export const ContractTermsSchema = z.object({
  clientName: z.string().nullable().default(null),
  currency: z.string().nullable().default(null),
  totalAmount: z.string().nullable().default(null),
  paymentTerms: z.string().nullable().default(null),
  milestones: z.array(z.object({
    description: z.string(),
    amount: z.string().nullable().default(null),
    due: z.string().nullable().default(null),
  })).max(30).default([]),
  deliverables: z.array(z.string()).max(40).default([]),
  deadline: z.string().nullable().default(null),
  revisionLimit: z.string().nullable().default(null),
  cancellationTerms: z.string().nullable().default(null),
  intellectualPropertyTerms: z.string().nullable().default(null),
  disputeTerms: z.string().nullable().default(null),
  governingLaw: z.string().nullable().default(null),
  evidence: z.array(z.string()).max(40).default([]),
});

export const SimulationRequestSchema = z.object({
  amount: MoneyString,
  currency: z.string().trim().regex(/^[A-Z]{3}$/),
  fxRateToInr: z.number().finite().positive().max(1_000_000),
  processingFeePercent: z.number().finite().min(0).max(20),
  fixedFeePerTransaction: z.number().finite().min(0).max(1_000_000).default(0),
  fxSpreadPercent: z.number().finite().min(0).max(20).default(0),
  withholdingPercent: z.number().finite().min(0).max(50).default(0),
  annualCapitalCostPercent: z.number().finite().min(0).max(100).default(0),
  workCompletedBeforeFirstPaymentPercent: Percent.default(0),
  scenarios: z.array(z.object({
    name: z.string().trim().min(1).max(50),
    installments: z.array(z.object({
      sharePercent: z.number().finite().positive().max(100),
      delayDays: z.number().int().min(0).max(3650).default(0),
    })).min(1).max(20),
  }).refine((scenario) => {
    const sum = scenario.installments.reduce((total, item) => total + item.sharePercent, 0);
    return Math.abs(sum - 100) < 0.001;
  }, "Each scenario's installment percentages must add up to 100.")).min(1).max(6),
});

export const ClientTrustRequestSchema = z.object({
  clientName: z.string().trim().min(1).max(120),
  evidenceSource: z.string().trim().min(3).max(300),
  period: z.string().trim().min(3).max(100),
  projectsCompleted: z.number().int().min(0).max(10_000),
  paymentsOnTime: z.number().int().min(0).max(10_000),
  paymentsLate: z.number().int().min(0).max(10_000),
  disputes: z.number().int().min(0).max(10_000),
  cancellations: z.number().int().min(0).max(10_000),
  scopeChanges: z.number().int().min(0).max(10_000),
});

export type ContractTerms = z.infer<typeof ContractTermsSchema>;
export type SimulationRequest = z.infer<typeof SimulationRequestSchema>;
export type ClientTrustRequest = z.infer<typeof ClientTrustRequestSchema>;
