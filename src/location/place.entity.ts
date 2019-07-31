import { Column, Entity, PrimaryColumn } from 'typeorm'

export interface Place {
  id: string
  city: string
  adminArea: string
  adminAreaShort: string
  country: string
  countryShort: string
  postalCode: string
  lat: number
  lng: number
}

@Entity('places')
export class PlaceEntity implements Place {
  @PrimaryColumn()
  id!: string

  @Column()
  city!: string

  @Column()
  adminArea!: string

  @Column()
  adminAreaShort!: string

  @Column()
  country!: string

  @Column()
  countryShort!: string

  @Column()
  postalCode!: string

  @Column()
  lat!: number

  @Column()
  lng!: number
}
