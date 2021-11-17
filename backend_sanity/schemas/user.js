// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'UserName',
      type: 'string',
    },
    {
      name: 'displayName',
      title: 'DisplayName',
      type: 'string',
    },
    {
      name: 'id',
      title: 'ID',
      type: 'number',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
  ],
};
