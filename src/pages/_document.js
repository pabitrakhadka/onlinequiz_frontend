import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <script type="module" src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/tailspin.js"></script>



        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
