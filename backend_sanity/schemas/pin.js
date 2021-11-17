// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'pin',
  title: 'Pin',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'about',
      title: 'About',
      type: 'string',
    },
    {
      name: 'destination',
      title: 'Destination',
      type: 'url',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Cats', value: 'cats' },
          { title: 'Cars', value: 'cars' },
        ],
      },
      layout: 'radio',
    },
    {
      name: 'pinImage',
      title: 'PinImage',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'id',
      title: 'ID',
      type: 'number',
    },
    {
      name: 'postedBy',
      title: 'PostedBy',
      type: 'postedBy',
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'postedBy',
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{ type: 'comment' }],
    },
  ],
};
