export interface IVatvalidatorResponse {
  valid: boolean
  countryCode: string
  vatNumber: string
  name: string
  address: {
    street: string
    number: string
    zip_code: string
    city: string
    country: string
    countryCode: string
  }
  strAddress: string
}
