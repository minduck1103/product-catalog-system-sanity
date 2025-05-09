import { createClient } from 'next-sanity'
import { config } from './sanity.config'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient(config)

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => {
  return builder.image(source)
} 