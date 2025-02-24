type Names = {
  de?: string;
  en: string;
  es?: string;
  fa?: string;
  fr?: string;
  ja?: string;
  "pt-BR"?: string;
  ru?: string;
  "zh-CN"?: string;
  ko?: string;
};

type City = {
  geoname_id: number;
  names: Names;
};

type Continent = {
  code: string;
  geoname_id: number;
  names: Names;
};

type Country = {
  geoname_id: number;
  is_in_european_union: boolean;
  iso_code: string;
  names: Names;
};

type Location = {
  latitude: number;
  longitude: number;
  time_zone: string;
  weather_code: string;
};

type Subdivision = {
  geoname_id?: number;
  iso_code?: string;
  names: Partial<Names>;
};

type Traits = {
  autonomous_system_number: number;
  autonomous_system_organization: string;
  connection_type: string;
  isp: string;
  user_type: string;
};

export type GeoData = {
  city: City;
  continent: Continent;
  country: Country;
  location: Location;
  subdivisions: Subdivision[];
  traits: Traits;
};
