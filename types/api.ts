export type partnerStation = {
  id: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  profitSharePercentage: number
  PartnerId: string
  StationId: string
}
export type PowerbankStation = {
  PriceType?: number
  frontSN: string
  id: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  SN: string
  slot: number
  status: string
  location_id: string
  units: any[]
  location: {
    id: string
    name: string
    detail: string
  }
  promotors: {
    id: string
    deletedAt: any
    createdAt: string
    updatedAt: string
    name: string
    phone: string
    email: string
  }[]
}

export type UboxAPIResponse<T> = {
  data: T
  code: number
  message: string
  total: number
  dataValues?: Record<string, any>
}

export type SignInResponse = {
  code: number
  message: string
  accessToken: string
  expiresIn: number
  tokenType: string
  user: {
    uid: string
  }
}

export type TcpLog = {
  id?: string
  deletedAt?: any
  createdAt: string
  updatedAt: string
  SN: string
  type: string
  ip: string
  data: string
  rentId?: string
}

export type PowerbankCluster = {
  id: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  name: string
  detail: string
  coordinates: string
  pic: string
  phone: string
  email: string
  description: string
  locations: {
    name: string
    coordinates: string
    id: string
  }[]
}

export type PowerbankLocation = {
  weekday: any
  weekend: any
  id: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  name: string
  detail: string
  coordinates: string
  clusterId: string
  pic: string
  phone: string
  email: string
  description: string
  isAirport?: boolean
}

export type Promotor = {
  id: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  name: string
  phone: string
  email: string
  powerbankStations: PowerbankStation[]
}

export type ClusterLocation = {
  id: string
  name: string
}

export type Powerbank = {
  id: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  SN: string
  status: number
  port: number
  power: number
  PowerbankStationId: string
  UserId: any
  station: {
    SN: string
    location: any
  }
}

export interface UserRole {
  id: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  name: string
}

export interface User {
  id: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  email: string
  phone: string
  fullName: string
  balance: any
  isActive: boolean
  isBlocked: boolean
  RoleId: string
  Role: UserRole
  UserPermissions: any[]
}

export type Promo = {
  id: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  code: string
  name: string
  price: number
  VoucherId: string
  start_expired: string
  end_expired: string
  voucherQty: number
  banner: string
  image: string
}

export type Voucher = {
  id: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  code: string
  name: string
  duration: number
  activeDays: number
}

export type Transaction = {
  rentStatus?: any
  RentId?: string
  TopupId?: string
  UserId: string
  brand: string
  code: string
  createdAt: string
  deletedAt?: string
  duration?: number
  id: string
  metode: string
  mtrReturn: string
  nominal: number
  remainingBalance: number
  status: string
  time?: string
  type: string
  updatedAt: string
  fullName: string
}

export type Rent = {
  id: string
  deletedAt?: string
  createdAt: string
  updatedAt: string
  firstPay: number
  timestamp: string
  startRent: string
  locationRent?: string
  status: boolean
  return?: string
  locationReturn?: string
  PowerbankStationId: string
  PowerbankStationIdReturn?: string
  PowerbankIds: string
  UserId: string
}

export type PowerbankRented = {
  id: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  SN: string
  status: number
  port: number
  power: number
  PowerbankStationId: string
  UserId: any
  Rents: Rent[]
  station: {
    SN: string
  }
}

export type Banner = {
  startDate?: string
  endDate?: string
  id: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  name: string
  slider: string
}

export type Support = {
  id: string
  deletedAt?: any
  createdAt?: string
  updatedAt?: string
  phone: string
}

export type Price = {
  id: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  from_duration: number
  to_duration: number
  price: number
  multiply: boolean
}

export type Partnership = {
  stations?: (PowerbankStation & {
    PartnerStations: partnerStation
  })[]
  UserId?: string
  id: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  approvedAt: string
  bussinesName: string
  pic: string
  email: string
  phone: string
  address: string
  approved: boolean
}

export type MinumumSaldo = {
  minimal: number
  minimal2: number
  minimalAirport: number
  minimalAirport2: number
}

export type Permission = {
  id: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  name: string
  path: string
  method: string
}

export type UnitReport = {
  total: number
}

export type DurationReport = {
  total: string
}

export type MonthlyReport = {
  type: string
  month: string
  total: string | number
  total_trx: number
}

export type WeeklyReport = {
  date: string
  total: string | number
  day: number
}

export type LaporanKhusus = {
  UserId: string
  total: string
  User: Pick<User, 'fullName' | 'email' | 'phone'>
}

export type DefaultPrice = {
  default: number
}

export type PerdayPrice = {
  perday: number
}

export interface LaporanDaftarUserBaru {
  code: string
  UserId: string
  total_trx: number
  User: Pick<User, 'id' | 'fullName' | 'email' | 'phone'>
}

export interface RentTrx {
  id: string
  deletedAt: any
  createdAt: string
  updatedAt: string
  firstPay: number
  timestamp: string
  startRent: string
  locationRent: string
  status: boolean
  return: string
  locationReturn: string
  PowerbankStationId: string
  PowerbankStationIdReturn: string
  PowerbankIds: string
  UserId: string
  Transaction: Transaction
  location: {
    id: string
    name: string
    detail: string
  }
  LocationReturn: {
    id: string
    name: string
    detail: string
  }
}
