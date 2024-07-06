
import { PrimaryLink } from "../components/dashboard/ButtonAndLinks";

const Home = () => {
  return (
    <>
      <div className="h-screen max-h-screen w-4/5 m-auto flex flex-col items-center justify-center max-w-7xl text-center">
        <h1 className="text-3xl font-bold">Eat Now</h1>
        <p className="text-[#00e9ca]">
          Meal reminder for busy creatives and techies
        </p>

        <div className="flex flex-col items-center mt-10">
          <p>
            Set up meal reminders, get email notifications with menu options and
            never skip a meal again.{" "}
          </p>
          <img
            src="/assets/eat-now.png"
            alt="eat-now"
            height={500}
            width={500}
          />
          <PrimaryLink name="Get Started" to={"/register"} />
        </div>
      </div>
    </>
  );
};

export default Home;
