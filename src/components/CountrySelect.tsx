import { UseFormReturn } from 'react-hook-form'
import { IFormInput } from '../interface'
import { intToBin } from '../utils'

const countries = [
    "Afghanistan",
    "Albania",
    "Antarctica",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Azerbaijan",
    "Argentina",
    "Australia",
    "Austria",
    "Bahamas (the)",
    "Bahrain",
    "Bangladesh",
    "Armenia",
    "Barbados",
    "Belgium",
    "Bermuda",
    "Bhutan",
    "Bolivia (Plurinational State of)",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "Belize",
    "British Indian Ocean Territory (the)",
    "Solomon Islands",
    "Virgin Islands (British)",
    "Brunei Darussalam",
    "Bulgaria",
    "Myanmar",
    "Burundi",
    "Belarus",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cabo Verde",
    "Cayman Islands (the)",
    "Central African Republic (the)",
    "Sri Lanka",
    "Chad",
    "Chile",
    "China",
    "Taiwan (Province of China)",
    "Christmas Island",
    "Cocos (Keeling) Islands (the)",
    "Colombia",
    "Comoros (the)",
    "Mayotte",
    "Congo (the)",
    "Congo (the Democratic Republic of the)",
    "Cook Islands (the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia",
    "Benin",
    "Denmark",
    "Dominica",
    "Dominican Republic (the)",
    "Ecuador",
    "El Salvador",
    "Equatorial Guinea",
    "Ethiopia",
    "Eritrea",
    "Estonia",
    "Faroe Islands (the)",
    "Falkland Islands (the) [Malvinas]",
    "South Georgia and the South Sandwich Islands",
    "Fiji",
    "Finland",
    "Åland Islands",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories (the)",
    "Djibouti",
    "Gabon",
    "Georgia",
    "Gambia (the)",
    "Palestine, State of",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Kiribati",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guinea",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (the)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Côte d'Ivoire",
    "Jamaica",
    "Japan",
    "Kazakhstan",
    "Jordan",
    "Kenya",
    "Korea (the Democratic People's Republic of)",
    "Korea (the Republic of)",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic (the)",
    "Lebanon",
    "Lesotho",
    "Latvia",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Monaco",
    "Mongolia",
    "Moldova (the Republic of)",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Oman",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands (the)",
    "Curaçao",
    "Aruba",
    "Sint Maarten (Dutch part)",
    "Bonaire, Sint Eustatius and Saba",
    "New Caledonia",
    "Vanuatu",
    "New Zealand",
    "Nicaragua",
    "Niger (the)",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Norway",
    "Northern Mariana Islands (the)",
    "United States Minor Outlying Islands (the)",
    "Micronesia (Federated States of)",
    "Marshall Islands (the)",
    "Palau",
    "Pakistan",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines (the)",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Guinea-Bissau",
    "Timor-Leste",
    "Puerto Rico",
    "Qatar",
    "Réunion",
    "Romania",
    "Russian Federation (the)",
    "Rwanda",
    "Saint Barthélemy",
    "Saint Helena, Ascension and Tristan da Cunha",
    "Saint Kitts and Nevis",
    "Anguilla",
    "Saint Lucia",
    "Saint Martin (French part)",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Viet Nam",
    "Slovenia",
    "Somalia",
    "South Africa",
    "Zimbabwe",
    "Spain",
    "South Sudan",
    "Sudan (the)",
    "Western Sahara*",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Eswatini",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic (the)",
    "Tajikistan",
    "Thailand",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "United Arab Emirates (the)",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands (the)",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "North Macedonia",
    "Egypt",
    "United Kingdom of Great Britain and Northern Ireland (the)",
    "Guernsey",
    "Jersey",
    "Isle of Man",
    "Tanzania, the United Republic of",
    "United States of America (the)",
    "Virgin Islands (U.S.)",
    "Burkina Faso",
    "Uruguay",
    "Uzbekistan",
    "Venezuela (Bolivarian Republic of)",
    "Wallis and Futuna",
    "Samoa",
    "Yemen",
    "Zambia"
]

export function CountrySelect(props: { form: UseFormReturn<IFormInput> }) {
    return (
        <select {...props.form.register('country')}>
            {countries.map((country) => (
                <option key={country} value={intToBin(countries.indexOf(country), 9)}>
                    {country}
                </option>
            ))}
        </select>
    )
}
