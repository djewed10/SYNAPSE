'use client';

import { useParams } from 'next/navigation';

export default function VoletDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div>
      <h1 className=\
text-3xl
font-bold
text-white
mb-8\>Volet Details: {id}</h1>
    </div>
  );
}
