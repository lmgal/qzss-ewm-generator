import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const types = [
  'Anthrax',
  'Avian influenza in humans',
  'Botulism',
  'Brucellosis',
  'Campylobacteriosis',
  'Chikungunya virus disease',
  'Chalmydia infections',
  'Cholera',
  'COVID-19',
  'Creutzfeldt - Jakob disease,variant(vCJD)',
  'Cryptosporidiosis',
  'Dengue',
  'Diphtheria',
  'Echinococcosis',
  'Giardiasis',
  'Gonorrhoea',
  'Hepatitis A',
  'Hepatitis B',
  'Hepatitis C',
  'HIV infection and AIDS',
  'Infections with heamophilus influenza group B',
  'Influenza including Influenza A(H1N1)',
  'Invasive meningococcal disease',
  'Invasive pneumococcal disease',
  "Legionnaries' disease",
  'Leptospirosis',
  'Listeriosis',
  'Lyme neuroborreliosis',
  'Malaria',
  'Measles',
  'Meningoccocal disease, invasive',
  'Mumps',
  'Pertussis',
  'Plague',
  'Pneumoccocal invasive diseases',
  'Poliomyelitis',
  'Q fever',
  'Rabies',
  'Rubella',
  'Rubella, congenital',
  'Salmonellosis',
  'Severe Acute Respiratory Syndrome (SARS)',
  'Shiga toxin /verocytotoxin -producing Escherichia coli (STEC/VTEC)',
  'Shigellosis',
  'Smallpox',
  'Syphilis',
  'Syphilis, congenital',
  'Tetanus',
  'Tick-borne encephalitis',
  'Toxoplasmosis, congenital',
  'Trichinellosis',
  'Tuberculosis',
  'Tularaemia',
  'Typhoid and paratyphoid fevers',
  'Viral haemorrhagic fevers',
  'West Nile virus infection',
  'Yellow fever',
  'Yersinosis',
  'Zika virus disease',
  'Zika virus disease, congenital',
  'Nosocomial infections',
  'Antimicrobial resistance',
  'unidentified infection',
  'not used',
]

export function InfectionType() {
  const form = useFormContext<IFormInput>()

  return (
    <>
      <label className="col-span-2 md:col-span-1">Infection Type</label>
      <select className="col-span-2 md:col-span-1" {...form.register('infectionType', {
        valueAsNumber: true
      })}>
        { types.map((type, i) => (
          <option key={i} value={i}>
            {type}
          </option>
        )) }
      </select>
      <span className="text-xs col-span-2">REFERENCE - European Centre for Disease Prevention and Control - EU case definitions - https://www.ecdc.europa.eu/en/all-topics/eu-case-definitions</span>
    </>
  )
}
