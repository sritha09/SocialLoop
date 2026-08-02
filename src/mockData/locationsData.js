export const COUNTRIES = [
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
];

export const LOCATIONS_BY_COUNTRY = {
  IN: [
    { state: 'Telangana', cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'] },
    { state: 'Karnataka', cities: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi'] },
    { state: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane'] },
    { state: 'Delhi NCR', cities: ['Delhi', 'Gurugram', 'Noida', 'Faridabad'] },
    { state: 'Tamil Nadu', cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli'] },
    { state: 'Andhra Pradesh', cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati'] },
    { state: 'West Bengal', cities: ['Kolkata', 'Howrah', 'Siliguri', 'Durgapur'] },
    { state: 'Gujarat', cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'] },
    { state: 'Rajasthan', cities: ['Jaipur', 'Udaipur', 'Jodhpur', 'Kota'] },
    { state: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra'] },
  ],
  US: [
    { state: 'California', cities: ['San Francisco', 'Los Angeles', 'San Jose', 'San Diego'] },
    { state: 'New York', cities: ['New York', 'Buffalo', 'Rochester', 'Albany'] },
    { state: 'Texas', cities: ['Austin', 'Houston', 'Dallas', 'San Antonio'] },
    { state: 'Florida', cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville'] },
    { state: 'Washington', cities: ['Seattle', 'Tacoma', 'Spokane'] },
  ],
  GB: [
    { state: 'England', cities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool'] },
    { state: 'Scotland', cities: ['Edinburgh', 'Glasgow', 'Aberdeen'] },
  ],
  CA: [
    { state: 'Ontario', cities: ['Toronto', 'Ottawa', 'Hamilton'] },
    { state: 'British Columbia', cities: ['Vancouver', 'Victoria', 'Kelowna'] },
    { state: 'Quebec', cities: ['Montreal', 'Quebec City'] },
  ],
  AU: [
    { state: 'New South Wales', cities: ['Sydney', 'Newcastle', 'Wollongong'] },
    { state: 'Victoria', cities: ['Melbourne', 'Geelong', 'Ballarat'] },
    { state: 'Queensland', cities: ['Brisbane', 'Gold Coast', 'Cairns'] },
  ],
  JP: [
    { state: 'Kanto', cities: ['Tokyo', 'Yokohama', 'Chiba'] },
    { state: 'Kansai', cities: ['Osaka', 'Kyoto', 'Kobe'] },
  ],
  AE: [
    { state: 'Emirates', cities: ['Dubai', 'Abu Dhabi', 'Sharjah'] },
  ],
  SG: [
    { state: 'Singapore Region', cities: ['Singapore', 'Central Water Catchment', 'Jurong East'] },
  ],
  DE: [
    { state: 'Bavaria', cities: ['Munich', 'Nuremberg'] },
    { state: 'Berlin State', cities: ['Berlin'] },
    { state: 'North Rhine-Westphalia', cities: ['Cologne', 'Düsseldorf'] },
  ],
  FR: [
    { state: 'Île-de-France', cities: ['Paris', 'Boulogne-Billancourt'] },
    { state: 'Provence-Alpes-Côte d\'Azur', cities: ['Marseille', 'Nice'] },
  ]
};
