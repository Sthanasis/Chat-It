import { MongoClient } from 'mongodb';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Profile from '../../components/User/Profile';

const ProfilePage: NextPage = ({
  user,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <Profile user={user} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://sakis:10921092@yad.tbrsb.mongodb.net/chatIt?retryWrites=true&w=majority'
  );
  const db = client.db();
  const userCollection = db.collection('users');

  const result: any[] = await userCollection
    .find({}, { projection: { uid: 1 } })
    .toArray();
  client.close();

  const paths = result.map((obj) => {
    return {
      params: { profileid: obj.uid },
    };
  });

  return { fallback: false, paths };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const uid = context.params?.profileid;
  const client = await MongoClient.connect(
    'mongodb+srv://sakis:10921092@yad.tbrsb.mongodb.net/chatIt?retryWrites=true&w=majority'
  );

  const db = client.db();
  const userCollection = db.collection('users');

  const result = await userCollection.findOne(
    { uid },
    { projection: { password: 0, _id: 0 } }
  );

  client.close();

  if (!result) {
    return {
      props: {
        user: [],
      },
    };
  } else {
    return {
      props: {
        user: result,
      },
    };
  }
};

export default ProfilePage;
