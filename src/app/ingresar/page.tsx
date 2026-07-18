import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AuthPanel } from './auth-panel';

export const metadata: Metadata = { title: 'Ingresar a Mi ELEMA', robots: { index: false, follow: false } };

export default function SignInPage() {
  return <Suspense><AuthPanel /></Suspense>;
}
