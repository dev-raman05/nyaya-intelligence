import EvidenceClient from './EvidenceClient';

export function generateStaticParams() {
  const caseIds = [
    'SC_ARB_001', 'SC_ARB_002', 'SC_ARB_003', 'SC_ARB_004', 'SC_ARB_005', 
    'SC_ARB_006', 'SC_ARB_007', 'SC_ARB_008', 'SC_ARB_009', 'SC_ARB_010', 
    'SC_ARB_011', 'SC_EVD_001', 'SC_EVD_002', 'SC_EVD_003', 'SC_EVD_004', 
    'SC_EVD_005', 'SC_EVD_006', 'SC_EVD_007', 'SC_FR_001', 'SC_FR_002', 
    'SC_FR_003', 'SC_FR_004', 'SC_FR_005', 'SC_FR_006', 'SC_FR_007', 
    'SC_CON_001', 'SC_CON_002', 'SC_CON_003', 'SC_CON_004', 'SC_CON_005', 
    'SC_CON_006'
  ];

  return caseIds.map((id) => ({
    caseId: id,
  }));
}

export default function EvidencePage({ params }) {
  return <EvidenceClient params={params} />;
}
