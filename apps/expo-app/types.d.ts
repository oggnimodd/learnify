declare module "@portabletext/react-native" {
  import { PortableText } from "@portabletext/react";

  // biome-ignore lint/suspicious/noRedeclare: <explanation>
  export const PortableText: typeof PortableText;
}
