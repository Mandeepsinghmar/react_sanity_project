import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: '60slbd68',
  dataset: 'production',
  apiVersion: '2021-11-16', // use current UTC date - see "specifying API version"!
  useCdn: true, // `false` if you want to ensure fresh data
  token:
    'skaCKvjueVcieFsfkmuQkV6cxFUsFDPbqy2zQj3jv7twZHYSOmrU1g4s00pedZyOO1qs2LDc5GuKbkZyuZC0TFTSpFtbPL49L1fOwI98s5jFSxupW5pUWaUefJzonpgQYeJTC4AY2JERPNm4iy7IAxihJM9FypUcHlHmhjDAIeNrTezgVyNA',
  //   token:
  //     'skKlCPmI2GyLrEhF1EnlUbunb15aQIbpJtFNuqAYQWmEe3u79xisobcJ3L8ddgG5GezZeCyz2WxMic9FS',
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
