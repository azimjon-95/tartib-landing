export default function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-label="Tartib CRM Logo">
      <rect width="100" height="100" rx="20" fill="#0B1A3E"/>
      <rect x="12" y="12" width="26" height="26" rx="5" fill="#3B82F6"/>
      <rect x="44" y="12" width="26" height="26" rx="5" fill="white" opacity=".18"/>
      <rect x="12" y="44" width="26" height="26" rx="5" fill="#06B6D4"/>
      <rect x="44" y="44" width="26" height="26" rx="5" fill="#3B82F6"/>
      <rect x="12" y="74" width="26" height="26" rx="5" fill="white" opacity=".12"/>
      <rect x="44" y="74" width="26" height="26" rx="5" fill="#06B6D4"/>
      <rect x="76" y="44" width="12" height="12" rx="3" fill="white" opacity=".15"/>
      <rect x="76" y="76" width="12" height="12" rx="3" fill="#3B82F6" opacity=".6"/>
      <line x1="38" y1="25" x2="44" y2="25" stroke="#3B82F6" strokeWidth="2" opacity=".5"/>
      <line x1="38" y1="57" x2="44" y2="57" stroke="#06B6D4" strokeWidth="2" opacity=".5"/>
      <line x1="25" y1="38" x2="25" y2="44" stroke="#3B82F6" strokeWidth="2" opacity=".5"/>
      <line x1="57" y1="38" x2="57" y2="44" stroke="#06B6D4" strokeWidth="2" opacity=".5"/>
    </svg>
  )
}
