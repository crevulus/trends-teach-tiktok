"use client";

import firebaseApp from "@/firebase/config";
import { getFirestore, collection } from "firebase/firestore";
import { Fragment } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

const db = getFirestore(firebaseApp);

export default function Home() {
  const [genres, loading, error] = useCollection(collection(db, "genres"));

  if (error) {
    return <p>Error!</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      {genres
        ? genres.docs.map((doc) => (
            <Fragment key={doc.id}>{JSON.stringify(doc.data())}, </Fragment>
          ))
        : null}
    </main>
  );
}
