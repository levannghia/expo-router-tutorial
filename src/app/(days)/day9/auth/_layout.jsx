import { Redirect, Slot } from 'expo-router';

export default function AuthLayout() {
//   if (authStatus === 'authenticated') {
//     return <Redirect href={'/day9/protected'} />;
//   }

  return <Slot />;
}