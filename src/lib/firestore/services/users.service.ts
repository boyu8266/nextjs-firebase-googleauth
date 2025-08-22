import { FieldValue } from "firebase-admin/firestore";
import { firestore } from "../index";
import { User } from "../models/user.model";

export interface GoogleProfile {
  sub: string;
  name?: string | null;
  email?: string | null;
  picture?: string | null;
}

export async function findOrCreateUser(profile: GoogleProfile): Promise<User> {
  const usersCollection = firestore.collection("users");
  const userRef = usersCollection.doc(profile.sub as string);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    const newUser: User = {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      createdAt: FieldValue.serverTimestamp(),
    };
    await userRef.set(newUser);
    return newUser;
  } else {
    await userRef.update({
      lastLoginAt: FieldValue.serverTimestamp(),
    });
    return userDoc.data() as User;
  }
}
