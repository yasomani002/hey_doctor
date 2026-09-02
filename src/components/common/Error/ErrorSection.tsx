import error_background from "@/assets/images/error_background.svg";
import error500 from "@/assets/images/error500.svg";
// import GapElement from "@/lib/Gapelement";
import { Text } from "../Text";
import { colors } from "@/styles/colors";

const ErrorSection = ({ errorCode }: { errorCode: number }) => {
  if (errorCode === 429) {
    return (
      <div
        className="flex flex-col items-center justify-center h-screen"
        style={{ backgroundImage: `url(${error_background})` }}
      >
        <img src={error500} alt="error" />
        {/* <GapElement height={20} /> */}
        <p className="text-center text-sm">
          Limit Reach: Looks like we've hit the digital highway's speed limit.
          Time for a pit stop to refuel.
        </p>
      </div>
    );
  }

  if (errorCode === 405) {
    return (
      <div
        className="flex flex-col items-center justify-center h-screen"
        style={{ backgroundImage: `url(${error_background})` }}
      >
        <img src={error500} alt="error" className="w-1/2 h-1/2" />
        {/* <GapElement height={20} /> */}
        <p className="text-center text-sm">
          Method Not Allowed: This action isn't permitted here. Please try a
          different approach.
        </p>
      </div>
    );
  }

  if (errorCode === 500) {
    return (
      <div
        className="flex flex-col items-center justify-center h-screen"
        style={{ backgroundImage: `url(${error_background})` }}
      >
        <img src={error500} alt="error" />
        {/* <GapElement height={20} /> */}
        <div className="m-5 text-center flex flex-col items-center justify-center gap-2 w-full">
          <Text fontSize={'14px'} fontWeight={600}>
            Oops! Something went wrong behind the scenes.
          </Text>
          <Text fontSize={'12px'} fontWeight={400} color={colors.text.label}>
            We're working to fix it. Please refresh or try again later.
          </Text>
        </div>
      </div>
    );
  }
  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{ backgroundImage: `url(${error_background})` }}
    >
      <img src={error500} alt="error" className="w-1/2 h-1/2" />
      {/* <GapElement height={20} /> */}
    </div>
  );
};

export default ErrorSection;
