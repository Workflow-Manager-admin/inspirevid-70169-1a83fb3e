import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { QuoteVideo } from "./QuoteVideo";
import { EndScreen } from "./EndScreen";
import { z } from "zod";
// import { theme } from "./VideoTheme"; // theme is not used

// Remotion composition schemas for prop validation
export const quoteVideoSchema = z.object({
  quote: z.string(),
  author: z.string(),
});
export type QuoteVideoInput = z.infer<typeof quoteVideoSchema>;

export const RemotionRoot: React.FC = () => {
  // To avoid SSR issues, always use safe defaults. Remotion passes props at render.
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />

      <Composition
        id="InspireQuote"
        component={QuoteVideo}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
        schema={quoteVideoSchema}
        defaultProps={{
          quote: "Dream big. Start small. Act now.",
          author: "Robin Sharma",
        }}
      />
      <Composition
        id="EndScreen"
        component={EndScreen}
        durationInFrames={95}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
