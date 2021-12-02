import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: '60slbd68',
  dataset: 'production',
  apiVersion: '2021-11-16', // use current UTC date - see "specifying API version"!
  useCdn: true, // `false` if you want to ensure fresh data
  token:
  process.env.REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
